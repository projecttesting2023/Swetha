import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert, } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import CustomHeader from '../components/CustomHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput, LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { deleteImg, editImg, phoneImg, searchImg, userPhoto } from '../utils/Images'
import CustomButton from '../components/CustomButton'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
import ReactNativeBlobUtil from 'react-native-blob-util';

const OrderStatementScreen = ({ navigation }) => {
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [statementData, getStatementData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [pdfLink, setPdfLink] = useState('')

    const handleDayPress = (day) => {
        if (startDay && !endDay) {
            const date = {}
            for (const d = moment(startDay); d.isSameOrBefore(day.dateString); d.add(1, 'days')) {
                //console.log(d,'vvvvvvvvvv')
                date[d.format('YYYY-MM-DD')] = {
                    marked: true,
                    color: 'black',
                    textColor: 'white'
                };

                if (d.format('YYYY-MM-DD') === startDay) {
                    date[d.format('YYYY-MM-DD')].startingDay = true;
                }
                if (d.format('YYYY-MM-DD') === day.dateString) {
                    date[d.format('YYYY-MM-DD')].endingDay = true;
                }
            }

            setMarkedDates(date);
            setEndDay(day.dateString);
        }
        else {
            setStartDay(day.dateString)
            setEndDay(null)
            setMarkedDates({
                [day.dateString]: {
                    marked: true,
                    color: 'black',
                    textColor: 'white',
                    startingDay: true,
                    endingDay: true
                }
            })
        }

    }

    const actualDownload = (url) => {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `orderStatement.pdf`,
                path: `${dirs.DownloadDir}/orderStatement.pdf`,
            },
        })
            .fetch('GET', url, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                // ToastAndroid.show('The file saved to ', res.path(), ToastAndroid.SHORT);
                Toast.show({
                    type: 'success',
                    text2: "PDF Downloaded successfully",
                    position: 'top',
                    topOffset: Platform.OS == 'ios' ? 55 : 20
                });
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const downloadPDFByDateRange = async () => {
        console.log(startDay, 'startDay')
        console.log(endDay, 'endDay')
        const option = {
            "start_date": moment(startDay).format("DD-MM-YYYY"),
            "end_date": moment(endDay).format("DD-MM-YYYY")
        }

        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`${API_URL}/public/api/user/genpdf`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    //console.log(res.data.orders_date, 'order statement')
                    //getStatementData(res.data.orders_date)
                    setIsLoading(false);
                    if (res.data.st == '200') {
                        setPdfLink(res.data.pdf_url)
                        actualDownload(res.data.pdf_url)
                    } else if (res.data.st == '400') {
                        Alert.alert('Oops..', res.data.massage, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }

                })
                .catch(e => {
                    console.log(`Product Details error ${e}`)
                });

        });

    }
    // const convertHTMLtoPDF = async () => {
    //     const htmlContent = `
    //     <html>
    //       <body>
    //         <h1>Hello, React Native HTML-to-PDF</h1>
    //         <p>This is a sample HTML content.</p>
    //       </body>
    //     </html>
    //   `;

    //     const options = {
    //         html: htmlContent,
    //         fileName: 'sample-pdf',
    //         directory: 'Documents',
    //     };

    //     try {
    //         const pdfFile = await RNHTMLtoPDF.convert(options);

    //         // Get the PDF file path
    //         const pdfFilePath = pdfFile.filePath;
    //         // Define the destination directory where the PDF will be saved
    //         const destDirectory = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;

    //         // Define the destination path for the downloaded PDF
    //         const destPath = `${destDirectory}/OrderStatement.pdf`;

    //         // Move the PDF to the destination directory
    //         await RNFS.moveFile(pdfFilePath, destPath);

    //         console.log('PDF saved to:', destPath);
    //         sharePDF(destPath)

    //     } catch (error) {
    //         console.error('Error converting HTML to PDF:', error);
    //     }
    // };

    // const sharePDF = (destPath) => {
    //     // Share the PDF using the Share API
    //     // Share.open({
    //     //     title: 'Share PDF',
    //     //     url: `file://${destPath}`,
    //     //     type: 'application/pdf',
    //     // });
    //     Share.open({
    //         title: 'Share PDF',
    //         url: destPath,
    //         type: 'application/pdf',
    //     })
    //         .then((result) => {
    //             Toast.show({
    //                 type: 'success',
    //                 text2: 'PDF Downloaded and Shared successfully',
    //                 position: 'top',
    //                 topOffset: Platform.OS === 'ios' ? 55 : 20,
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     // Display a success message
       
    // }

    const sharePDF = async () => {
        const pdfUrl = pdfLink; // Replace with your PDF link
        const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/orderStatement.pdf`; // Define the file path where the PDF will be saved
      
        try {
          const response = await RNFetchBlob.config({
            fileCache: true,
            path: filePath,
          }).fetch('GET', pdfUrl);
      
          if (response.info().status === 200) {
            const options = {
              type: 'application/pdf',
              url: `file://${filePath}`,
            };
      
            await Share.open(options);
          } else {
            console.log('Failed to download PDF');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const sharePDFByDateRange = () => {
        console.log(startDay, 'startDay')
        console.log(endDay, 'endDay')
        const option = {
            "start_date": moment(startDay).format("DD-MM-YYYY"),
            "end_date": moment(endDay).format("DD-MM-YYYY")
        }

        AsyncStorage.getItem('userToken', (err, usertoken) => {
            axios.post(`${API_URL}/public/api/user/genpdf`,
                option,
                {
                    headers: {
                        "Authorization": 'Bearer ' + usertoken,
                        "Content-Type": 'application/json'
                    },
                })
                .then(res => {
                    //console.log(res.data.orders_date, 'order statement')
                    //getStatementData(res.data.orders_date)
                    setIsLoading(false);
                    if (res.data.st == '200') {
                        setPdfLink(res.data.pdf_url)
                        sharePDF()

                    } else if (res.data.st == '400') {
                        Alert.alert('Oops..', res.data.massage, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }

                })
                .catch(e => {
                    console.log(`Product Details error ${e}`)
                });

        });
    }

    return (
        <SafeAreaView style={styles.Container}>
            <CustomHeader commingFrom={'Profile'} onPress={() => navigation.goBack()} title={'Order Statement'} />
            <ScrollView style={styles.wrapper}>
                <View style={{ marginBottom: responsiveHeight(3) }}>
                    <Text style={{ color: '#444', fontFamily: 'Poppins-Regular', fontSize: responsiveFontSize(2) }}>Please select your statement period</Text>
                    <Calendar
                        onDayPress={(day) => {
                            handleDayPress(day)
                        }}
                        //monthFormat={"yyyy MMM"}
                        //hideDayNames={false}
                        markingType={'period'}
                        markedDates={markedDates}
                        theme={{
                            selectedDayBackgroundColor: '#646464',
                            selectedDayTextColor: 'white',
                            monthTextColor: '#1697C0',
                            dayTextColor: 'black',
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 16,
                            arrowColor: '#1697C0',
                            dotColor: 'black'
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: '#E3EBF2',
                            borderRadius: 15,
                            height: responsiveHeight(50),
                            marginTop: 20,
                            marginBottom: 10
                        }}
                    />
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Share"} buttonIcon={false} onPress={() => sharePDFByDateRange()} />
                    </View>
                    <View style={styles.buttonwrapper}>
                        <CustomButton label={"Download"} buttonIcon={false} onPress={() => downloadPDFByDateRange()} />
                    </View>
                    {/* <View style={styles.buttonwrapper}>
                        <CustomButton label={"Email"} buttonIcon={false} onPress={null} />
                    </View> */}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default OrderStatementScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        padding: responsiveWidth(5),
        marginBottom: responsiveHeight(1)
    },
    buttonwrapper: {
        alignSelf: 'center',
        marginVertical: 10
    },

});
