<script lang="ts" setup></script>

<template>
	<div id="wrapper">
		<img id="imgDown" src="../uploads/loginImage1.png" />
		<img id="imgUp" src="../uploads/loginImage2.png" />
		<div id="logoWrapper">
			<img id="logo" src="../uploads/ewai-logo.png" />
			<div id="subtitle">
				The <span class="capital-letters">E</span>lectronic
				<span class="capital-letters">WAI</span>ter. Without the
				<span class="capital-letters">WAI</span>t.
			</div>
		</div>
		<div id="buttonWrapper">
			<div id="welcome">WELCOME BACK!</div>
			<el-button id="button" color="#ED5087" plain round> Login </el-button>
		</div>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Tourney');
@import url('https://fonts.googleapis.com/css?family=Cairo');

#imgUp {
	position: fixed;
	left: 60%;
	width: 80%;
	height: auto;
	margin-top: -40%;
	z-index: -1;
}

#imgDown {
	position: absolute;
	padding-top: 20vh;
	right: 50%;
	width: 80%;
	height: auto;
	z-index: -1;
}

#logoWrapper {
	position: absolute;
	left: 3%;
	top: 5%;
}

#logo {
	position: relative;
	width: 40%;
	height: auto;
}

#subtitle {
	position: relative;
	top: 20%;
	font-size: 1.8vw;
	font-family: 'Tourney';
}

#subtitle .capital-letters {
	color: #ed5087;
}

#welcome {
	font-family: 'Cairo';
	font-weight: bolder;
	font-size: 3vw;
	color: #727171;
	display: flex;
	justify-content: center;
	align-items: center;
}

#button {
	font-family: 'Cairo' !important;
	font-size: 2vw;
	font-weight: bolder;
	width: 25% !important;
	height: 7vh !important;
	border-radius: 3vw;
}

#buttonWrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 17%;
}

@media only screen and (max-width: 650px) {
	#imgDown,
	#imgUp {
		display: none;
	}

	#subtitle {
		font-size: 2.7vw;
	}

	#buttonWrapper {
		height: 70vh;
	}

	#welcome {
		font-size: 5vw;
	}

	#button {
		width: 50% !important;
		height: 9vh !important;
		font-size: 5vw;
		border-radius: 5vw;
	}
}
</style>
