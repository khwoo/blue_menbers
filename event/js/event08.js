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
		that.eventImageURL = `image/event08.jpg?v=${Date.parse(new Date())}`;
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

		that.linkCoordsList = [
			{
				id: 'id1',
				coords:that.setRectPosition( 14.52 , 2.15 , 3.6 , .75 )
			},
			{
				id: 'id2',
				coords:that.setRectPosition( 23.92 , 1.36 , 7.3 , .78 )
			}
		];

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
			if(data.id === 'id1'){
				location.href = 'http://www.cgv.co.kr/theaters/?page=location&theaterCode=0074#menu';
			}else{
				try {
					location.href = `event_detail08.html?custNo=${this.key_custNo}&uid=${this.key_uid}`;
				}catch(e){
					console.error('coords info error');
				}
			}

		}

	}
});