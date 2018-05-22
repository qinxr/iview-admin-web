<template>
	<div class="home-main">
		<Row>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityDay" :end-val="electricity.day" iconType="stats-bars" color="#2d8cf0" intro-text="当日用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityMonth" :end-val="electricity.month" iconType="stats-bars" color="#64d572" intro-text="月度用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityYear" :end-val="electricity.year" iconType="stats-bars" color="#ffd572" intro-text="年度用电量"></infor-card>
			</Col>
			<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px',paddingRight:'20px'}">
			<infor-card id-name="electricityTotal" :end-val="electricity.total" iconType="stats-bars" color="#f25e43" intro-text="累计用电量"></infor-card>
			</Col>
		</Row>
		<Row>
			<Col :lg="12" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					01-综合办公楼
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region6.quality.running}}</Row>
					<Row>更新时间：{{region6.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">1</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">6</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">245</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">9</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaOne" :autoplay-speed="4000"  loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									北楼配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBOneTrf">
										<Tag type="border" color="blue">1#变压器</Tag>
									</router-link>
									</Col>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBTwoTrf">
										<Tag type="border" color="blue">2#变压器</Tag>
									</router-link>
									</Col>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBThreeTrf">
										<Tag type="border" color="blue">3#变压器</Tag>
									</router-link>
									</Col>
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBFourTrf">
										<Tag type="border" color="blue">4#变压器</Tag>
									</router-link>
									</Col>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBFiveTrf">
										<Tag type="border" color="blue">5#变压器</Tag>
									</router-link>
									</Col>
									<Col :lg="8">
									<router-link to="/Pdms/hgpd/northBuilding/officeNBSixTrf">
										<Tag type="border" color="blue">6#变压器</Tag>
									</router-link>
									</Col>
								</Row>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									北楼配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region6.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region6.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region6.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region6.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region6.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region6.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region6.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region6.electricity.total.ia}}
								</p>
								<p>
									ib:{{region6.electricity.total.ib}}
								</p>
								<p>
									ic:{{region6.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region6.electricity.day" placement="top">
							<span class="tipnumber">{{region6.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region6.electricity.month" placement="top">
							<span class="tipnumber">{{region6.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region6.electricity.year" placement="top">
							<span class="tipnumber">{{region6.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col :lg="12" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					02-物流园
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region7.quality.running}}</Row>
					<Row>更新时间：{{region7.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">4</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">114</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2+2</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaTwo" :autoplay-speed="3600" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									<Col :lg="12">
									<Row class='flex-title'>
										A库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/aBank/logisticsAOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/aBank/logisticsATwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="12">
									<Row class='flex-title'>
										B库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBank/logisticsBOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBank/logisticsBTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									A库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region7.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region7.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									B库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[1].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region7.state[1].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[1].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region7.state[1].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region7.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region7.state[1].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region7.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region7.electricity.total.ia}}
								</p>
								<p>
									ib:{{region7.electricity.total.ib}}
								</p>
								<p>
									ic:{{region7.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.day" placement="top">
							<span class="tipnumber">{{region7.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.month" placement="top">
							<span class="tipnumber">{{region7.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region7.electricity.year" placement="top">
							<span class="tipnumber">{{region7.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col :lg="12" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					03-B型保税园
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region8.quality.running}}</Row>
					<Row>更新时间：{{region8.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">3</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">6</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">153</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">3+3+2</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaThree" :autoplay-speed="4500" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									<Col :lg="8">
									<Row class='flex-title'>
										F04配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/F04/bF04OneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/F04/bF04TwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="8">
									<Row class='flex-title'>
										F06配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/F06/bF06OneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/F06/bF06TwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="8">
									<Row class='flex-title'>
										D08配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/D08/bD08OneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/bBonded/D08/bD08TwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									F04配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region8.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region8.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									F08配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[1].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[1].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[1].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[1].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region8.state[1].smoke[0].name}}
									</Row>
									<Row v-if="region8.state[1].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									F08配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[2].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region8.state[2].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[2].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region8.state[2].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region8.state[2].smoke[0].name}}
									</Row>
									<Row v-if="region8.state[2].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region8.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region8.electricity.total.ia}}
								</p>
								<p>
									ib:{{region8.electricity.total.ib}}
								</p>
								<p>
									ic:{{region8.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region8.electricity.day" placement="top">
							<span class="tipnumber">{{region8.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region8.electricity.month" placement="top">
							<span class="tipnumber">{{region8.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region8.electricity.year" placement="top">
							<span class="tipnumber">{{region8.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col :lg="12" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					04-快件中心
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region9.quality.running}}</Row>
					<Row>更新时间：{{region9.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">4</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">112</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">3+3</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaFour" :autoplay-speed="3800" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									<Col :lg="12">
									<Row class='flex-title'>
										1#库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/freight/1/freightOBOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/freight/1/freightOBTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="12">
									<Row class='flex-title'>
										2#库配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/freight/2/freightTBOneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/freight/2/freightTBTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
								</Row>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									1#库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region9.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region9.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region9.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region9.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region9.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region9.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									2#库配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region9.state[1].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region9.state[1].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region9.state[1].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region9.state[1].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region9.state[1].smoke[0].name}}
									</Row>
									<Row v-if="region9.state[1].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region9.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region9.electricity.total.ia}}
								</p>
								<p>
									ib:{{region9.electricity.total.ib}}
								</p>
								<p>
									ic:{{region9.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region9.electricity.day" placement="top">
							<span class="tipnumber">{{region9.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region9.electricity.month" placement="top">
							<span class="tipnumber">{{region9.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region9.electricity.yea" placement="top">
							<span class="tipnumber">{{region9.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
			<Col :lg="24" :xs="24" class="card-position">
			<Card class='areaOne'>
				<p slot="title" class="title">
					<Icon type="ios-location"></Icon>
					05-BGS
				</p>
				<Row>
					<Col :lg="12">
					<Row>通讯质量：{{region10.quality.running}}</Row>
					<Row>更新时间：{{region10.quality.time}}</Row>
					<Row class='flex-content' style='margin-top: 30px;'>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2</Tag>
						</Row>
						<Row class='flex-content'>
							配电室
						</Row>

						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">4</Tag>
						</Row>
						<Row class='flex-content'>
							变压器
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">114</Tag>
						</Row>
						<Row class='flex-content'>
							电表
						</Row>
						</Col>
						<Col :lg="6">
						<Row>
							<Tag type="border" color="blue">2+2</Tag>
						</Row>
						<Row class='flex-content'>
							视频
						</Row>
						</Col>
					</Row>
					</Col>
					<Col :lg="12">
					<Carousel autoplay v-model="areaFive" :autoplay-speed="4700" loop>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									<Col :lg="12">
									<Row class='flex-title'>
										1#配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/BGSOnePDRoom/bGSOnePDROneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/BGSOnePDRoom/bGSOnePDRTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
									<Col :lg="12">
									<Row class='flex-title'>
										2#配电室
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/BGSTwoPDRoom/bGSTwoPDROneTrf">
											<Tag type="border" color="blue">1#变压器</Tag>
										</router-link>
									</Row>
									<Row class='flex-content'>
										<router-link to="/Pdms/hgpd/BGSTwoPDRoom/bGSTwoPDRTwoTrf">
											<Tag type="border" color="blue">2#变压器</Tag>
										</router-link>
									</Row>
									</Col>
								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									1#配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region10.state[0].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region10.state[0].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region10.state[0].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region10.state[0].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region10.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region10.state[0].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>
						<CarouselItem>
							<div class="demo-carousel">
								<Row class='flex-title'>
									2#配电室
								</Row>
								<Row class='flex-content'>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										温度
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region10.state[1].envs[0].tem}}℃</Tag>
									</Row>
									<Row>
										<Tag type="border" color="yellow">{{region10.state[1].envs[1].tem}}℃</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										湿度
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region10.state[1].envs[0].hum}}%</Tag>
									</Row>
									<Row>
										<Tag type="border" color="#5cadff">{{region10.state[1].envs[1].hum}}%</Tag>
									</Row>
									</Col>
									<Col :lg="8">
									<Row style='margin-bottom: 15px;'>
										{{region10.state[0].smoke[0].name}}
									</Row>
									<Row v-if="region10.state[1].smoke[0].smoke==2">
										<span class='state' style="background-color: #ed3f14;">告警</span>
									</Row>
									<Row v-else>
										<span class='state' style="background-color: #19be6b;">正常</span>
									</Row>

									</Col>

								</Row>

							</div>
						</CarouselItem>

					</Carousel>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row style='text-align: center;'>
					<Col :lg="6">
					<Row>
						<Tooltip placement="top">
							<span class="tipnumber">{{region10.electricity.total.total}}</span>
							<div slot="content">
								<p>
									ia:{{region10.electricity.total.ia}}
								</p>
								<p>
									ib:{{region10.electricity.total.ib}}
								</p>
								<p>
									ic:{{region10.electricity.total.ic}}
								</p>
							</div>
						</Tooltip>
					</Row>
					<Row>
						总负载电流
					</Row>

					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region10.electricity.day" placement="top">
							<span class="tipnumber">{{region10.electricity.day}}</span>
						</Tooltip>
					</Row>
					<Row>
						当日用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region10.electricity.month" placement="top">
							<span class="tipnumber">{{region10.electricity.month}}</span>
						</Tooltip>
					</Row>
					<Row>
						当月用电量
					</Row>
					</Col>
					<Col :lg="6">
					<Row>
						<Tooltip :content="region10.electricity.year" placement="top">
							<span class="tipnumber">{{region10.electricity.year}}</span>
						</Tooltip>
					</Row>
					<Row>
						当年用电量
					</Row>
					</Col>
				</Row>
			</Card>
			</Col>
		</Row>

		<Row style="margin-top: 15px; padding-right: 20px;">

			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					操作日志

				</p>
				<div class="edittable-table-height-con">
					<Row>
						<Col :lg='20'>&nbsp;</Col>
						<Col :lg="4" style="text-align: right;">
						<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入事件内容搜索..." style="width: 200px" />
						</Col>
					</Row>
					<Row>
						&nbsp;
					</Row>
					<Table border refs="table" :data="logsData" v-model="logsData" :columns="editInlineColumns"></Table>
				</div>
				<div style="padding: 20px;overflow: hidden">
					<div style="float: right;">
						<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
					</div>
				</div>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import inforCard from './components/inforCard.vue';
	import axios from 'axios'
	export default {
		name: 'hgpdhome_index',
		components: {
			//			countUp,
			inforCard,
		},
		data() {
			return {
				areaOne: 0,
				areaTwo: 0,
				areaThree: 0,
				areaFour: 0,
				areaFive: 0,
				pageSize: 5, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				logsData: [],
				searchConName1: "",
				editInlineColumns: [{
						title: '序号',
						key: 'id',
						align: 'left',
						width: '10%',
						sortable: true
					},
					{
						title: '人物',
						align: 'left',
						width: '15%',
						key: 'userName',
					},
					{
						title: '事件内容',
						align: 'left',
						key: 'info',
					},
					{
						title: 'IP地址',
						align: 'left',
						width: '15%',
						key: 'ip_address',
					},
					{
						title: '时间',
						align: 'left',
						width: '10%',
						key: 'created_at',
					},

				],
				region6: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
						envs: [{
							tem: 0,
							hum: 0,
						}, {
							tem: 0,
							hum: 0,
						}],
						smoke: [{
							name: ''
						}]
					}],
				},
				region7: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						}
					],
				},
				region8: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						}
					],
				},
				region9: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
					],
				},
				region10: {
					electricity: {
						day: 0,
						month: 0,
						year: 0,
						total: 0,
					},
					quality: '',
					state: [{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						},
						{
							envs: [{
								tem: 0,
								hum: 0,
							}, {
								tem: 0,
								hum: 0,
							}],
							smoke: [{
								name: ''
							}]
						}
					],
				},
				electricity: {
					day: 0,
					month: 0,
					year: 0,
					total: 0,
				},

			};
		},
		mounted() {
			this.getElectricity("prj", 2);
			//console.log(this.electricity)
			//区域一（综合办公楼）信息获取
			this.getLastTime(6);
			this.getElectricity("region", 6);
			this.getElectricityAsRegion("region", 6);
			this.getStateAsRegion(6);
			//区域二（物流园）信息获取
			this.getLastTime(7);
			this.getElectricity("region", 7);
			this.getElectricityAsRegion("region", 7);
			this.getStateAsRegion(7);
			//区域三（保税园）信息获取
			this.getLastTime(8);
			this.getElectricity("region", 8);
			this.getElectricityAsRegion("region", 8);
			this.getStateAsRegion(8);
			//区域四（快件中心）信息获取
			this.getLastTime(9);
			this.getElectricity("region", 9);
			this.getElectricityAsRegion("region", 9);
			this.getStateAsRegion(9);
			
			//区域五（BGS）信息获取
			this.getLastTime(10);
			this.getElectricity("region", 10);
			this.getElectricityAsRegion("region", 10);
			this.getStateAsRegion(10);
			//获取操作日志
			this.getLogs();
		},
		methods: {
			//获取操作日志
			getLogs() {
				var copy = this;
				axios.get(Api.url + "pdms/log/getLogsAsProject/" + Api.pdId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						//console.log(response.data.data);
						copy.historyData = response.data.data;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.logsData = copy.historyData;
						} else {
							copy.logsData = copy.historyData.slice(0, copy.pageSize);
						}

					})
					.catch((error) => {
						console.log(error);
					})
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.logsData = this.historyData.slice(0, this.pageSize);
				} else {

					this.logsData = this.historyData;
					this.logsData = this.search(this.logsData, {
						info: this.searchConName1
					});
				}
			},
			//搜索功能函数
			search(data, argumentObj) {
				let res = data;
				let dataClone = data;
				for(let argu in argumentObj) {
					if(argumentObj[argu].length > 0) {
						res = dataClone.filter(d => {
							return d[argu].indexOf(argumentObj[argu]) > -1;
						});
						dataClone = res;
					}
				}
				return res;
			},
			//分页功能
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.logsData = this.historyData.slice(_start, _end);
			},
			//根据区域ID获取通讯质量和更新时间
			getLastTime(id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getLastTimeAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							case 6:
								copy.region6.quality = response.data.data;
								break;
							case 7:
								copy.region7.quality = response.data.data;
								break;
							case 8:
								copy.region8.quality = response.data.data;
								break;
							case 9:
								copy.region9.quality = response.data.data;
								break;
							case 10:
								copy.region10.quality = response.data.data;
								break;

						}

					})
					.catch((error) => {
						console.log(error);
					})
			},
			//用电量获取
			getElectricity(type, id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getDegreeTotal/" + type + "/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							case 6:
								copy.region6.electricity.day = parseFloat(response.data.data.day);
								copy.region6.electricity.month = parseFloat(response.data.data.month);
								copy.region6.electricity.year = parseFloat(response.data.data.year);
								break;
							case 7:
								copy.region7.electricity.day = parseFloat(response.data.data.day);
								copy.region7.electricity.month = parseFloat(response.data.data.month);
								copy.region7.electricity.year = parseFloat(response.data.data.year);
								break;
							case 8:
								copy.region8.electricity.day = parseFloat(response.data.data.day);
								copy.region8.electricity.month = parseFloat(response.data.data.month);
								copy.region8.electricity.year = parseFloat(response.data.data.year);
								break;
							case 9:
								copy.region9.electricity.day = parseFloat(response.data.data.day);
								copy.region9.electricity.month = parseFloat(response.data.data.month);
								copy.region9.electricity.year = parseFloat(response.data.data.year);
								break;
							case 10:
								copy.region10.electricity.day = parseFloat(response.data.data.day);
								copy.region10.electricity.month = parseFloat(response.data.data.month);
								copy.region10.electricity.year = parseFloat(response.data.data.year);
								break;
							default:
								copy.electricity.day = parseFloat(response.data.data.day);
								copy.electricity.month = parseFloat(response.data.data.month);
								copy.electricity.year = parseFloat(response.data.data.year);
								copy.electricity.total = parseInt(response.data.data.total);

								break;
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//区域实时负载电流获取
			getElectricityAsRegion(type, id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getIaIbIc/" + type + "/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							case 6:
								copy.region6.electricity.total = response.data.data;
								break;
							case 7:
								copy.region7.electricity.total = response.data.data;
								break;
							case 8:
								copy.region8.electricity.total = response.data.data;
								break;
							case 9:
								copy.region9.electricity.total = response.data.data;
								break;
							case 10:
								copy.region10.electricity.total = response.data.data;
								break;

						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			//变压器实时状态获取
			getStateAsRegion(id) {
				var copy = this;
				axios.get(Api.url + "pdms/dashboard/getRoomAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						switch(id) {
							case 6:
								copy.region6.state = response.data.data;
								break;
							case 7:
								copy.region7.state = response.data.data;
								break;
							case 8:
								copy.region8.state = response.data.data;
								break;
							case 9:
								copy.region9.state = response.data.data;
								break;
							case 10:
								copy.region10.state = response.data.data;
								break;

						}
					})
					.catch((error) => {
						console.log(error);
					})
			}

		}
	};
</script>

<style>
	.card-position {
		padding-right: 20px;
		margin-top: 15px;
	}
	
	.title {
		font-size: 20px !important;
	}
	
	.demo-carousel {
		text-align: center;
		padding-bottom: 20px;
	}
	
	.flex-title {
		font-size: larger;
	}
	
	.flex-content {
		text-align: center;
		font-size: 14px;
		margin: 15px 0;
	}
	
	.areaOne .ivu-carousel-track:nth-child(2) {
		display: none;
	}
	
	.state {
		height: 48px;
		width: 48px;
		color: white;
		border-radius: 100%;
		line-height: 48px;
		font-size: 16px;
		padding: 8px 22px;
	}
	
	.line-gray {
		height: 0;
		border-bottom: 2px solid #dcdcdc;
		margin-bottom: 15px;
	}
	
	.tipnumber {
		font-weight: 600;
		font-size: 16px;
	}
</style>