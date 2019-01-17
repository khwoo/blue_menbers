

/**
 *
 *   현대셀렉션
 *
 */
var vm = new Vue({
	el: '.container',
	data: {
		androidApp_Coords :'0,0,0,0'
		,iosApp_Coords :'0,0,0,0'
	},

	created:function(){

		var that = this;

		that.$utils_link( that );

	},
	mounted: function() {
		var that = this;
		that.$utils_location_params( that );
		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.scrollHeight;
		console.log(pageHeight);
		let rem_px = adapt( pageWidth , pageWidth / 10 );
		let fontSize = pageWidth / pageWidth * ( pageWidth / 10 ) / rem_px * 100;
		that.pageWidth = pageWidth;
		that.pageHeight = pageHeight;
		that.remPx = rem_px;
		that.fontSize = fontSize;
		that.androidApp_Coords  = that.setRectPosition(38.8,2.9,6.4,0.9);
		that.iosApp_Coords      = that.setRectPosition(40,2.9,6.4,0.9);
	},
	methods: {
		setRectPosition:function( top , left , width , height ){
			let topPosition     = ((( top * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let leftPosition    = ((( left * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let widthPosition   = parseFloat( ((( width * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat(leftPosition);
			let heightPosition  = parseFloat( ((( height * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat( topPosition );
			return `${leftPosition},${topPosition},${widthPosition},${heightPosition}`;
		},

		androidApp:function(){
			location.href ='https://play.google.com/store/apps/details?id=com.hmc.aos.subscription';
		}
		,iosApp:function(){

			var ua = navigator.userAgent.toLowerCase();

			if(ua.indexOf('android') > 0 ){
				location.href = 'https://itunes.apple.com/ko/app/id1446387718?l=ko?ls=1?mt=8';
			}else{
				location.href = 'itms://itunes.apple.com/app/id1446387718';
			}


		}
	}

});