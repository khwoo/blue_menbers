

/**
 *
 *   현대셀렉션
 *
 */
var vm = new Vue({
	el: '.container',
	data: {
		eventLink_Coords :'0,0,0,0'
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
		that.eventLink_Coords  = that.setRectPosition(12.99,0.9,8.2,1.4);
	},
	methods: {
		setRectPosition:function( top , left , width , height ){
			let topPosition     = ((( top * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let leftPosition    = ((( left * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let widthPosition   = parseFloat( ((( width * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat(leftPosition);
			let heightPosition  = parseFloat( ((( height * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat( topPosition );
			return `${leftPosition},${topPosition},${widthPosition},${heightPosition}`;
		},

		eventLink:function(){
			location.href = 'https://m.deliverycar.co.kr/m/user/pbntEvnt/newYearEvnt.do';
		}
	}

});