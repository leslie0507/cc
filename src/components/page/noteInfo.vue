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
				<!-- textarea框区域 -->
				<div class="textarea-wrapper">
					<textarea  class="el-textarea el-textarea-big" value="" placeholder="" />
				</div>
				<!-- 按钮区域 -->
				<div class="btn-wrapper">

					<button class="el-btn blue-btn">保持修改</button>
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
	// 重置密码框内容的输入样式
	input[type='password'] {
		font-size: 18px;
		color: rgba(153, 153, 153, 1);
		// 去掉浏览器默认input内容样式
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	//textarea内容样式重置
	textarea{
		font-size:14px;
		color:rgba(89,89,89,1);
		line-height:30px;
		// 隐藏滚动条
		// overflow-x:hidden;
		// overflow-y:hidden;
	}


	//最后一项去掉边线
	.last-item {
		border: none;
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
		background: url(../../assets/icons/background.png) no-repeat center center;
    background-size: cover;
		.loading-img {
			width: 504px;
			height: 586px;

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
				box-shadow: 0px 2px 4px 0px rgba(12, 3, 6, 0.1);
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

			.main-content-wrapper {
				width: 100%;
				// background-color: red;
				box-sizing: border-box;
				
				padding:20px;
				// height: 214px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.textarea-wrapper{
					
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					// padding-bottom:10px;
					.el-textarea-big{
						// margin-bottom:10px;
						width:464px;
						height:426px;
						background:rgba(255,255,255,1);
						border:1px solid rgba(105, 202, 142, 1);
						box-shadow:0px 2px 5px 0px rgba(12,3,6,0.2);
						border-radius:8px;
					}
				}

				.btn-wrapper {
					// background-color: blue;
					width:100%;
					padding-top:20px;
					display: flex;
					justify-content:flex-end;
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

