var vm = new Vue({
	el: '.container',
	data: {
		pageWidth : 0
		,pageHeight : 0
		,remPx : 0
		,fontSize:0
		,linkCoordsList:[]
		,eventImageURL :''
	},
	created:function(){
		var that = this;
		that.$utils_link( that );
		that.eventImageURL = `image/event07.jpg?v=${Date.parse(new Date())}`;
	},
	mounted: function() {
		var that = this;
		that.$utils_location_params( that );

		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.scrollHeight;
		let rem_px = adapt( pageWidth , pageWidth / 10 );
		let fontSize = pageWidth / pageWidth * ( pageWidth / 10 ) / rem_px * 100;
		that.pageWidth = pageWidth;
		that.pageHeight = pageHeight;
		that.remPx = rem_px;
		that.fontSize = fontSize;

		that.linkCoordsList = [{
			coords:that.setRectPosition( 35.9 , .5 , 9 , 1 )
		}];

	},
	methods: {
		setRectPosition:function( top , left , width , height ){
			let topPosition     = ((( top * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let leftPosition    = ((( left * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let widthPosition   = parseFloat( ((( width * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat(leftPosition);
			let heightPosition  = parseFloat( ((( height * this.remPx ) * this.fontSize ) / 100).toFixed(2)) + parseFloat( topPosition );
			return `${leftPosition},${topPosition},${widthPosition},${heightPosition}`;
		},
		setCircPosition:function( top , left , size ){
			let topPosition     = ((( top * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let leftPosition    = ((( left * this.remPx ) * this.fontSize ) / 100).toFixed(2);
			let zPosition = parseFloat( ((( size * this.remPx ) * this.fontSize ) / 100).toFixed(2)).toFixed(2);
			return `${leftPosition},${topPosition},${zPosition}`;
		}
		,link:function( data ){
			var brandCd = '';

			try {
				location.href = `event_detail07.html?custNo=${this.key_custNo}&uid=${this.key_uid}`;
			}catch(e){
				console.error('coords info error');
			}
		}

	}
});