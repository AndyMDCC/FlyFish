import {
	FONTSTYLE,
	FONTWEIGHT,
	TITLELINKTARGET,
	LEGENDTYPE,
	LEGENDORIENT,
	RADARSHAPE,
} from '../constant'
import { XAXISPOSITION } from '../constant/xAxis'
import { YAXISPOSITION } from '../constant/yAxis'
import {
	AXISTYPE,
	AXISNAMELOCATIONTYPE,
	AXISLINETYPE,
	AXISLINECAP,
	AXISLINEJOIN,
} from '../constant/batchAxis'
import { TOOLTIPTIGGER } from '../constant/tooltip'
import { SYMBOL } from '../constant/series'

export const COLORS = [
	'#6FC4FF',
	'#54F3FF',
	'#3891FF',
	'#FACF14',
	'#E36D6F',
	'#8F4EED',
	'#B8E986',
	'#FF2366',
	'#F5A623',
	'#00C1FF',
]

export const BACKGROUNDCOLOR = '#13183000'

export const BORDERCOLOR = 'rgba(0, 0, 0, 0.1)'

export const FONTCOLOR = '#9aabbd'

export const FONTFAMILY = '"Helvetica Neue", "Helvetica", "Arial", sans-serif'

export const FONTLINEHEIGHT = 1.5

export const TOOLTIPTRIGGER = 'axis'

export const LEGENDPAGEICONCOLOR = '#aaa'

export const LEGENDPAGEICONINACITVECOLOR = '#2f4554'

export const GRID = {
	top: '10%',
	bottom: '10%',
	left: '10%',
	right: '10%',
}

export const INITFONTSTYLE = {
	color: FONTCOLOR,
	fontStyle: Object.keys(FONTSTYLE)[0],
	fontWeight: Object.keys(FONTWEIGHT)[0],
	fontFamily: 'sans-serif',
	fontSize: 18,
	...GRID,
}

export const INITTITLES = {
	show: true,
	top: 10,
	left: 10,
	target: Object.keys(TITLELINKTARGET)[0],
	subtarget: Object.keys(TITLELINKTARGET)[0],
}

export const RECT = {
	width: 'auto',
	height: 'auto',
	backgroundColor: 'transparent',
}

export const LEGEND = {
	show: true,
	left: 'right',
	top: 'middle',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
	align: 'left',
	itemGap: 15,
	type: Object.keys(LEGENDTYPE)[0],
	orient: Object.keys(LEGENDORIENT)[1],
}

export const TOOLTIP = {
	show: true,
  showContent: true,
  alwaysShowContent: false,
  confine: false,
  enterable: false,
  hideDelay: 100,
  trigger: Object.keys(TOOLTIPTIGGER)[1],
  triggerOn: 'mousemove|click'
}

export const XAXIS = {
	show: false,
	position: Object.keys(XAXISPOSITION)[0],
	type: Object.keys(AXISTYPE)[1],
	nameGap: 15,
	nameLocation: Object.keys(AXISNAMELOCATIONTYPE)[0],
  axisLabel: {
    formatter: (value, index) => value,
  },
}

export const YAXIS = {
	show: false,
	position: Object.keys(YAXISPOSITION)[0],
	type: Object.keys(AXISTYPE)[0],
	nameGap: 15,
	nameLocation: Object.keys(AXISNAMELOCATIONTYPE)[0],
  axisLabel: {
    formatter: (value, index) => value,
  }
}

export const LINESTYLE = {
	color: BORDERCOLOR,
	width: 1,
	type: Object.keys(AXISLINETYPE)[0],
	dashOffset: 0,
	cap: Object.keys(AXISLINECAP)[0],
	join: Object.keys(AXISLINEJOIN)[0],
	miterLimit: 10,
	opacity: 1,
}

export const AREASTYLE = {
	// color: BORDERCOLOR, 
	opacity: 0.8,
}

export const AXISLINE = {
	show: true,
	onZero: true,
	lineStyle: LINESTYLE,
}

export const AXISTICK = {
	show: true,
	alignWithLabel: false,
	length: 5,
	inside: false,
	lineStyle: LINESTYLE,
}

export const SPLITLINE = {
	show: true,
	lineStyle: LINESTYLE,
}

export const AXISLABELWITHOUTRECT = {
	show: true,
	inside: false,
	margin: 8,
	...INITFONTSTYLE,
}

export const AXISLABEL = {
	...AXISLABELWITHOUTRECT,
	...RECT,
}

export const RADARSERIES = {
	symbol: Object.keys(SYMBOL)[0],
	symbolSize: 4,
	symbolKeepAspect: false,
	lineStyle: LINESTYLE,
	areaStyle: AREASTYLE,
	label: {
		show: false,
	},
}

export const RADAR = {
	radius: 75,
	startAngle: 90,
	splitNumber: 5,
	scale: false,
	shape: Object.keys(RADARSHAPE)[0],
	axisTick: {
		show: false,
	},
}

export const RADARGRID = {
	top: '50%',
	left: '50%',
	radius: '75%',
}

export const AXISPOINTER = {
  show: false,
  type: 'line',
  triggerTooltip: true,
  triggerOn: 'mousemove|click'
}

export const ANIMATION = {
  animation: true,
  animationThreshold: 2000,
  animationDuration: 1000,
  animationDurationUpdate: 300,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicInOut',
  animationDelay: 0,
  animationDelayUpdate: 0,
}
