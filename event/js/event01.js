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
		that.eventImageURL = `image/event02.png?v=${Date.parse(new Date())}`;
		// that.eventImageURL = `image/event02.png`;
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
			coords:that.setRectPosition( 12.5 , 3.1 , 3.8 , 0.9 )
			,id:'001'
			,title:'도미노피자'
		},{
			coords:that.setRectPosition( 27.4 , 3.1 , 3.8 , 0.9 )
			,id:'002'
			,title:'전통리조트 구름에'
		},{
			coords:that.setRectPosition( 45.95 , 3.1 , 3.8 , 0.9 )
			,id:'003'
			,title:'롯데호텔부산'
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
				location.href = `event_detail01.html?custNo=${this.key_custNo}&uid=${this.key_uid}&id=${data.id}`;
			}catch(e){
				console.error('coords info error');
			}
		}

	}
});