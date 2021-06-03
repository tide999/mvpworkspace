export default {
    autoShowTimes: 2,
    loadingpage: false,
    runTimes: 0,
    missionlist: [],
    missionname: '',
    missiondata: {},
    echartsArray: [],
    myChartsArray: [],
    getishowArray: [],
    optionArray: [],
    yAxisNumber: 2000,
    yAxisDataArray: [],
    legendDataArray: [],
    option: {
        title: {
            text: '',
            textStyle: {
                fontSize: 12
            }
        },
        legend: {
            show: true,
            itemGap: 5,
            itemWidth: 10,
            orient: 'vertical',
            top: 25,
            textStyle: {
                fontSize: 12,
            },
            data: [],
        },
        color: ['#FF8C00', '#5F9EA0', '#48D1CC'],
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click'
        },
        dataZoom: [{
            type: 'inside',
        }, ],
        grid: {
            top: 120,
            left: 42,
            right: 40,
            bottom: 15,
            containLabel: false
        },
        yAxis: {
            type: 'category',
            position: 'top',
            axisLine: {
                onZero: false
            },
            boundaryGap: false,
            data: [],
            inverse: true,
        },
        xAxis: {
            inverse: false,
            position: 'top',
            axisLine: {
                onZero: false
            },
            boundaryGap: false,
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                interval: 1,
                show: true,
                rotate: 45
            },
            // scale: true
        },
        series: [{
            data: [],
            type: 'line',
            symbol: 'none',
            smooth: true
        }]
    },
    isPushBtn: false,
    baseURL: '',
    exportTimes: 0,
    si: null,
    threeTimes: 0,
    playBackInterval: null,
    isplaybackbtn: false,
    autoInterval: null,
    echartToolTipsData: {
        name: '',
        data: [],
        fieldName: '',
        devDeep: '',
        table: [],
    },
    echartToolTipsDataDialog: false,
    echartToolTipsDataDialogLoading: false,
    historyDataResultNoData: false,
    controlbtn: '',
    loadingbtn: false,
    isAuto: false,
}