<template>
	<div>
		<ul class="chartUl">
			<li>
				<vue-highcharts :highcharts="Highcharts" :options="options" ref="firstChart"></vue-highcharts>
			</li>
			<li v-show="isShowThree">
				<vue-highcharts :highcharts="Highcharts" :options="secondOptions" ref="secondChart"></vue-highcharts>
			</li>
			<li v-show="isShowThree">
				<vue-highcharts :highcharts="Highcharts" :options="thirdOptions" ref="thirdChart"></vue-highcharts>
			</li>
		</ul>

	</div>
</template>

<script>
	import dataCollectApi from '@/api/dataCollect';
	import Highcharts from 'highcharts';
	import HighchartsNoData from 'highcharts-no-data-to-display';
	import VueHighcharts from 'vue2-highcharts';
	HighchartsNoData(Highcharts)
	export default {
		name: 'data-charts',
		components: {
			VueHighcharts
		},
		props: {
			changeFlag: {
				type: Boolean
			},
			chartData: {
				type: Object
			},
			chartClass: {
				type: String
			}
		},
		data() {
			return {
				Highcharts:Highcharts,
				isShowThree: true,
				options: {
					chart: {
						type: 'pie'
					},
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					credits: {
						enabled: false
					},
					plotOptions: {
						pie: {
							// allowPointSelect: true, //选中某块区域是否允许分离
							// cursor: 'pointer',
							dataLabels: {
								enabled: false //是否直接呈现数据 也就是外围显示数据与否
							},
							showInLegend: true,

							// dataLabels: {
							//   enabled: true
							// },
						}
					},
					series: []
				},
				secondOptions: {
					chart: {
						type: 'pie'
					},
					title: {
						text: 'Roll 分布图'
					},
					subtitle: {
						text: ''
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					credits: {
						enabled: false
					},
					plotOptions: {
						pie: {
							// allowPointSelect: true, //选中某块区域是否允许分离
							// cursor: 'pointer',
							dataLabels: {
								enabled: false //是否直接呈现数据 也就是外围显示数据与否
							},
							showInLegend: true,

							// dataLabels: {
							//   enabled: true
							// },
						}
					},
					series: []
				},
				thirdOptions: {
					chart: {
						type: 'pie'
					},
					title: {
						text: 'yaw 分布图'
					},
					subtitle: {
						text: ''
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					credits: {
						enabled: false
					},
					plotOptions: {
						pie: {
							// allowPointSelect: true, //选中某块区域是否允许分离
							// cursor: 'pointer',
							dataLabels: {
								enabled: false //是否直接呈现数据 也就是外围显示数据与否
							},
							showInLegend: true,

							// dataLabels: {
							//   enabled: true
							// },
						}
					},
					series: []
				}
			}
		},
		watch: {
			changeFlag: function() {
				if(this.$props.chartClass == "姿态角度") {
					this.threeFeature("pitch");
					this.threeFeature("yaw");
					this.threeFeature("roll");
					this.$data.isShowThree = true;
				} else {
					this.statisticsFeature();
					this.$data.isShowThree = false;
				}

			}
		},
		created() {
			if(this.$props.chartClass == "姿态角度") {
				this.threeFeature("pitch");
				this.threeFeature("yaw");
				this.threeFeature("roll");
				this.$data.isShowThree = true;
			} else {
				this.statisticsFeature();
				this.$data.isShowThree = false;
			};
			Highcharts.setOptions({
				lang:{
					noData:"暂无数据"
				}
			});
		},
		methods: {
			//姿态角度的请求
			threeFeature(val) {
				let qs = require('querystring');
				let list = {
					merchant_id: this.$props.chartData.merchant_id,
					store_id: this.$props.chartData.store_id,
					device_id: this.$props.chartData.device_id,
					st_time: this.$props.chartData.st_time,
					ed_time: this.$props.chartData.ed_time,
					tj_type: val
				}
				dataCollectApi.getDataTj(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data.length > 0) {
							let pieData = [];
							let resData = res.data.data;
							for(let i = 0; i < resData.length; i++) {
								pieData.push({
									name: resData[i].label,
									y: resData[i].ratio
								})
							};
							if(val === "pitch") {
								this.firstPie(pieData);
							} else if(val === "yaw") {
								this.secondPie(pieData);
							} else if(val === "roll") {
								this.threePie(pieData);
							}
						}else{
							if(val === "pitch") {
								this.firstPie([]);
							} else if(val === "yaw") {
								this.secondPie([]);
							} else if(val === "roll") {
								this.threePie([]);
							}

						}
					} else {
						this.$message(res.data.msg)
					}
				});
			},

			//其他类型的请求
			statisticsFeature() {
				let qs = require('querystring');
				let list = this.$props.chartData;
				dataCollectApi.getDataTj(qs.stringify(list)).then((res) => {
					if(res.data.errno === 0) {
						if(res.data.data.length > 0) {
							let pieData = [];
							let resData = res.data.data;
							for(let i = 0; i < resData.length; i++) {
								pieData.push({
									name: resData[i].label,
									y: resData[i].ratio
								})
							}
							this.firstPie(pieData);
						}else{
							this.firstPie([]);
						}
					} else {
						this.$message(res.data.msg)
					}
				});
			},
			//加载第一个饼状图
			firstPie(value) {
				let sname = "",chartname = "";
				if(this.$props.chartClass == "姿态角度") {
					sname = "pitch";
					chartname = "pitch 分布图"
				} else if(this.$props.chartClass == "模糊度") {
					sname = "模糊度";
					chartname = "模糊度";
				} else if(this.$props.chartClass == "光照值") {
					sname = "光照值";
					chartname = "光照值";
				} else if(this.$props.chartClass == "脸完整度") {
					sname = "遮挡";
					chartname = "脸完整度"
				} else if(this.$props.chartClass == "遮挡") {
					sname = "遮挡";
					chartname = "遮挡"
				}
				let firstChart = this.$refs.firstChart;
				firstChart.delegateMethod('showLoading', 'Loading...');
				firstChart.removeSeries();
				setTimeout(() => {
					firstChart.hideLoading();
					firstChart.addSeries({
						name: sname,
						data: value
					});
					firstChart.getChart().update({
						title: {
						   text: chartname
					   }
					})
					
				})
			},

			//加载第二个饼状图
			secondPie(value) {
				let secondChart = this.$refs.secondChart;
				secondChart.delegateMethod('showLoading', 'Loading...');
				secondChart.removeSeries();
				setTimeout(() => {
					secondChart.hideLoading();
					secondChart.addSeries({
						name: "yaw",
						data: value
					});
				})
			},

			//加载第三个饼状图
			threePie(value) {
				let threeChart = this.$refs.thirdChart;
				threeChart.delegateMethod('showLoading', 'Loading...');
				threeChart.removeSeries();
				setTimeout(() => {
					threeChart.hideLoading();
					threeChart.addSeries({
						name: "roll",
						data: value
					});
				})
			},
		}
	}
</script>

<style>
	.chartUl>li {
		padding-top: 20px;
		padding-bottom: 40px;
	}
</style>