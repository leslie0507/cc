<template>
	<div class="login-wrap">
		<div class="loading-img">
			<div class="title">
				临床病历
				<button class="el-btn btn-1 btn-back">
					<span class="triangle-left"></span>
					返回
				</button>
			</div>
			<!-- 内容显示区域-->
			<div class="main-content-wrapper">
				<!-- 参数区域 -->
				<div class="params-wrapper">
					<!-- 一条 -->
					<div class="params-item">
						<div class="text">脑出血</div>
						<div class="fill-box">
							<button class="el-btn btn-default-single">无</button>
							<div class="input-box">
								<input type="text" class="el-input el-input-s" placeholder="手术前">
								<span>ml</span>
							</div>
							<div class="input-box">
								<input type="text" class="el-input el-input-s" placeholder="手术后">
								<span>ml</span>
							</div>
						</div>

						<button class="el-btn el-btn-unknown">未知</button>
					</div>
					<!-- 一条 -->
					<div class="params-item">
						<div class="text">脑梗塞</div>
						<div class="fill-box">
							<button class="el-btn btn-zuhe-actived el-btn-wu-actived">无</button>
							<button class="el-btn el-btn-youhuaisi">有坏死</button>
							<button class="el-btn el-btn-wuhuaisi">无坏死</button>
						</div>
						<button class="el-btn el-btn-unknown">未知</button>
					</div>
					<!-- 一条 -->
					<div class="params-item">
						<div class="text">脑积水</div>
						<div class="fill-box">
							<button class="el-btn btn-default-single">无</button>
							<div class="input-box">
								<input type="text" class="el-input el-input-m">
								<span>ml</span>
							</div>
						</div>

						<button class="el-btn el-btn-unknown">未知</button>
					</div>
					<!-- 一条 -->
					<div class="params-item">
						<div class="text">脑萎缩</div>
						<div class="fill-box">
							<button class="el-btn btn-zuhe-actived el-btn-wu-actived">无</button>
							<button class="el-btn el-btn-qing">轻</button>
							<button class="el-btn el-btn-zhong">中</button>
							<button class="el-btn el-btn-chong">重</button>
						</div>

						<button class="el-btn el-btn-unknown">未知</button>
					</div>
					<!-- 一条 -->
					<div class="params-item last-item">
						<div class="text">GCS</div>
						<div class="fill-box">
							<div class="input-box">
								<input type="text" class="el-input el-input-lg" placeholder="">
								
							</div>
						</div>
					</div>
				</div>
				<!-- 按钮区域 -->
				<div class="btn-wrapper">

					<button class="el-btn blue-btn">开始</button>
				</div>

			</div>

		</div>

	</div>
	</div>
</template>



<style lang="scss" scoped>
	// 重置文本框内容的输入样式
	input[type='text'] {
		font-size: 18px;
		color: rgba(153, 153, 153, 1);
		// 去掉浏览器默认input内容样式
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	//input框大小选择
	.el-input-s {
		
		width: 100px;
		height: 32px;
	}
	.el-input-m{
		width:125px;
		height: 32px;
	}
	.el-input-lg{
		width: 198px;
		height: 32px;
	}
	// 重置密码框内容的输入样式
	input[type='password'] {
		font-size: 18px;
		color: rgba(153, 153, 153, 1);
		// 去掉浏览器默认input内容样式
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	
	//textarea内容样式重置
	textarea {
		font-size: 14px;
		color: rgba(89, 89, 89, 1);
		line-height: 30px;
		// 隐藏滚动条
		// overflow-x:hidden;
		// overflow-y:hidden;
	}


	//最后一项去掉边线
	.last-item {
		border: none !important;
		
	}

	.btn-1 {
		width: 98px;
		height: 46px;
	}

	.btn-2 {
		width: 142px;
		height: 46px;
	}

	.setting-user-input {
		width: 274px;
		height: 50px;
		margin-left: 14px;
	}

	// 墙纸
	.login-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.loading-img {
			width: 561px;
			height: 485px;

			background: #e1ecef;

			box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
			border-radius: 8px;

			.title {
				width: 561px;
				height: 60px;
				display: flex;
				justify-content: center;
				color: rgba(119, 127, 143, 1);
				align-items: center;
				background: linear-gradient(0deg, rgba(230, 230, 230, 1), rgba(255, 255, 255, 1));
				box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1), 0px -8px 18px 0px rgba(255, 255, 255, 0.9);
				border-radius: 8px 8px 0 0;
				font-size: 24px;
				font-weight: bold;

				line-height: 30px;
				text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
				position: relative;

				// 返回按钮定位
				// 返回按钮定位
				.btn-back {
					width: 98px;
					height: 48px;
					position: absolute;
					top: 6px;
					right: 20px;
					color: rgba(119, 127, 143, 1);
					background: url(../../assets/icons/back-btn.png) no-repeat;
					background-size: cover;
				}
			}

			.main-content-wrapper {
				width: 100%;
				// width: 561px;
				height: 425px;
				// background-color: red;
				box-sizing: border-box;

				padding:20px;
				padding-top:6px;
				// height: 214px;
				display: flex;
				flex-direction: column;
				align-items: center;

				// justify-content: space-;
				.params-wrapper {
					width: 100%;
					// background-color: yellow;
					display: flex;

					flex-direction: column;
					// align-items: center;
					justify-content: center;
					.params-item {
						display: flex;
						flex-direction: row;
						// justify-content: center;
						align-items: center;
						border-bottom: 1px solid #cccccc;
						padding:16px 0 15px 0;

						.text {
							width: 105px;
							// color: green;
							font-size:18px;
							font-family:Microsoft YaHei;
							font-weight:bold;
							color:rgba(99,107,123,1);
							padding-left:20px;
							box-sizing: border-box;
							// background-color: red;
						}
						.fill-box{
							flex:1;
							
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.btn-default-single{
								margin-right:10px;
								width: 48px;
								height: 48px;
								// 弥补右边线
								border-right:1px solid rgba(204, 204, 204, 1);
								
								background: url(../../assets/icons/one_us.png) no-repeat;
								background-size: cover;
								
								color:#636b7b;
								
								border-radius:12px;
							}
							.input-box{
								padding-right:10px;
								
								span{
									margin-left: 5px;
									color:rgba(153,153,153,1);
								}
							}
							// 按钮背景色
							.el-btn-wu{
								width: 49px;
								height: 38px;
								
								background: url(../../assets/icons/l_us_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-wu-actived{
								width: 49px;
								height: 38px;
								color: #FFFFFF;
								background: url(../../assets/icons/l_s_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-youhuaisi{
								width: 87px;
								height: 38px;
								background: url(../../assets/icons/three_btn_m_us_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-wuhuaisi{
								width: 87px;
								height: 38px;
								background: url(../../assets/icons/three_btn_r_us_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-qing{
								width: 49px;
								height: 38px;
								background: url(../../assets/icons/m_us_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-zhong{
								width: 51px;
								height: 38px;
								background: url(../../assets/icons/m_us_1_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							.el-btn-chong{
								width: 50px;
								height: 38px;
								background: url(../../assets/icons/r_us_5.png) no-repeat;
								background-size: cover;
								border-radius: 0px;
							}
							
						}
						.el-btn-unknown{
							width: 64px;
							height: 38px;
							color:#FF9933;
							background: url(../../assets/icons/two-btn-us.png) no-repeat;
							background-size: cover;
							border-radius:0px;
						}
						
					}
				}


				.btn-wrapper {
					
					width: 100%;
					// padding-top: 20px;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					//蓝色按钮
					.blue-btn {
						width: 128px;
						height: 40px;
						background: url(../../assets/icons/blue-btn.png) no-repeat;
						background-size: cover;
						font-size: 18px;
						color: rgba(255, 255, 255, 1);

						line-height: 40px;
						font-weight: bold;
					}
				}
			}

		}
	}
</style>
<script>
	import {
		Login
	} from '@/api/user';
	import {
		queryPostList
	} from '@/api/data';
	let passwordRule = (rule, value, callback) => {
		if (value.length >= 6) {
			callback();
		} else {
			callback(new Error('密码长度不能少于6位'));
		}
	};
	export default {
		data: function() {
			return {
				elName: '',
				curStartTime: '2019-07-31 08:00:00',
				day: '0',
				hour: '00',
				min: '00',
				second: '00',

				param: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							validator: passwordRule,
							trigger: 'blur'
						}
					]
				}
			};
		},
		created() {
			sessionStorage.removeItem('ms_user');
			this.param.username = sessionStorage.getItem('userName');
		},
		mounted() {
			// this.curStartTime = '2020-08-09';
			// this.countTime();
		},
		methods: {
			submitForm() {
				this.$refs.login.validate(valid => {
					if (valid) {
						Login({
								account: this.param.username,
								pwd: this.param.password
							})
							.then(res => {
								console.log(this.respSuccess(res));
								if (!this.respSuccess(res)) {
									this.resNotice.warning(res.msg, this.respMessage(res));
									return;
								}
								sessionStorage.setItem('ms_user', JSON.stringify(res.data));
								queryPostList().then(res => {
									sessionStorage.setItem('expressList', JSON.stringify(res.data));
									sessionStorage.setItem('userName', this.param.username);
									this.$router.push('/');
								});
							})
							.catch(err => {
								console.log(err);
							});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	};
</script>
