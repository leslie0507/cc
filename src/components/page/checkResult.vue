<template>
	<div class="login-wrap">
		<div class="loading-img">
			<div class="title">
				检测结果
				<button class="el-btn btn-1 btn-back">
					<span class="triangle-left"></span>
					返回
				</button>
			</div>
			<!-- 检测结果区域 -->
			<div class="check-result-wrapper">
				<div class="result-info">
					<!-- 一个 -->
					<div class="info-item">
						<div class="left-name">
						<p>	脑水肿</p>
						</div>
						<div class="item-selected-wrapper">
							<div class="item-selected">
								<span class="radio-default-style"></span>
								<span class="text">疑似</span> 
							</div>
						</div>
						
					</div>
					<!-- 一个 -->
					<div class="info-item">
						<div class="left-name">
							<!-- 脑出血、脑积水、脑萎缩、脑梗死 -->
							<p>脑出血、脑积水、</p>
							<p>脑萎缩、脑梗死</p>
							
						</div>
						<div class="item-selected-wrapper">
							<div class="item-selected">
								<span class="radio-default-style"></span>
								<span class="text">疑似</span> 
							</div>
						</div>
						
					</div>
					<!-- 一个 -->
					<div class="info-item">
						<div class="left-name">
							
							<p>检测数据处于正常范围内</p>
							
						</div>
						<div class="item-selected-wrapper">
							<div class="item-selected">
								<span class="radio-default-style"></span>
								
							</div>
						</div>
						
					</div>
					<!-- 一个 -->
					<div class="info-item item-actived last-item">
						<div class="left-name">
							
							<p>检测异常</p>
							
						</div>
						<div class="item-selected-wrapper">
							<div class="item-selected">
								<span class="radio-default-style"></span>
								
							</div>
						</div>
						
					</div>
				</div>
				<!-- 按钮区域 -->
				<div class="btn-wrapper">
                    <button class="el-btn">重新检测</button>
                    <button class="el-btn">打印</button>
                </div>
			</div>
		</div>
	</div>
</template>

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

<style lang="scss" scoped>
	// 默认radio未选中样式
	.radio-default-style{
		width: 22px;
		height: 22px;
		background: url(../../assets/icons/radio-us.png) no-repeat;
		background-size: cover;
		display: inline-block;
		margin-right:3px;		
	}
	//item选中激活样式
	.item-actived{
		p{
			color:#FF9900;
			font-weight: bold;
		}
		span.radio-default-style{
			width: 22px;
			height: 22px;
			background: url(../../assets/icons/radio-s.png) no-repeat;
			background-size: cover;
			display: inline-block;
			margin-right:3px;
		}
		span.text{
			color:#FF9900;
		}
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
			width: 504px;
			height: 418px;

			background: #e1ecef;

			box-shadow: 0px 4px 10px 0px rgba(12, 3, 6, 0.2);
			border-radius: 8px;

			.title {
				width: 504px;
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

			.check-result-wrapper {
				width: 100%;
				height:358px;
				padding:20px;
				//c3盒子
				box-sizing: border-box;
				// background: blue;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.result-info {
					width: 472px;
					height: 258px;
					padding-left:19px;
					padding-right:26px;
					box-sizing: border-box;
			
					// 使用背景图
					background: url(../../assets/icons/w-box.png) no-repeat;
					background-size: cover;
					
					display: flex;
					flex-direction: column;
					
					

					.info-item {
						padding:12px 0;
						
						
						
						width:419px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						border-bottom: 1px solid rgba(204, 204, 204, 1);
						
						color: rgba(191, 191, 191, 1);

						.left-name {
							// background-color: red;
							margin-left: 10px;
							font-size: 24px;
							display: flex;
	
							flex-direction: column;
							align-items:flex-start;
							// text-align: center;
							justify-content: center;
							
						}
						.item-selected-wrapper{
							width: 71px;
							height: 22px;
							padding-right:9px;
							// width:100%;
							display: flex;
							justify-content: center;
							align-items: center;
							.item-selected{
								display: flex;
								
								align-items: center;
								font-size:18px;
								span{
									
									// background-color: red;
								}
						}
						
						}
					}
					// 去掉最后一个item边线
					.last-item{
						border: none;
					}
					
					
				}
				.btn-wrapper {
					width: 464px;
					display: flex;
					// 距离上面盒子
					margin-top: 20px;
					justify-content: space-between;
					align-items: center;
					button {
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
