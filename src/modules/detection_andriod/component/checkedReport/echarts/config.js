const pie = {
    // backgroundColor: {
    //     // image: bgPatternImg,
    //     repeat: 'repeat'
    // },
    color:["#71F27C","#B34038","#334553","#6F9FA7","#C9856B","#9CC5B0","#7D9D85",],
    title: {
        // text: '饼图纹理',
        // textStyle: {
        //     color: '#235894'
        // }
    },
    tooltip: {
        padding:15,
        trigger: 'item',
        formatter: '{b}<br/> {c} ({d}%)'
    },
    grid:{
        top:0,
        bottom:0
    },
    series: [{
        name: '',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        label: {
            fontSize: 14,
            // color: '#235894'
        },
        labelLine: {
            lineStyle: {
                color: '#235894'
            }
        },
        data: [
            // {value: 335, name: '未公开使用规则'},
            // {value: 310, name: '告知同意'},
            // {value: 234, name: '用户权利保障',color:'#0084ff'},
        ],
        // itemStyle: itemStyle
    }]
};

const bar = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left:60,
        top:0,
        bottom:20,
        // left: 100
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'value',
        name: '个数',
        axisLabel: {
            formatter: '{value}'
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: ['隐私行为', '申请权限'],
        axisTick:{
            show:false
        }
    },
    series: [
        {
            name: '通过',
            type: 'bar',
            stack:'使用情况',
            data: [165, 170, 30],
        },
        {
            name: '未通过',
            type: 'bar',
            stack:'使用情况',
            // label: seriesLabel,
            data: [150, 105, 110]
        },
    ]
};
const option = {
 pie,
 bar,
}    

export default option;