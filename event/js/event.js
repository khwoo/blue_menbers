var vm = new Vue({
	el: '.container',
	data: {
		pageWidth : 0
		,pageHeight : 0
		,remPx : 0
		,fontSize:0
		,close_Coords:'0,0,0,0'
		,link_coords:'0,0,0,0'
		,brandCoordsList:[]
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
		that.close_Coords = that.setRectPosition( 0 , 0 , 1.5 , 1.1 );

		that.brandCoordsList = [
						 { id:'',coords:that.setCircPosition( 11.7  , 2.15  , 0.9       )   }
						,{ id:'',coords:that.setCircPosition( 11.45 , 5.48  , 0.9       )   }
						,{ id:'',coords:that.setCircPosition( 13.5  , 3.09  , 0.9       )   }
						,{ id:'',coords:that.setCircPosition( 13.9  , 5.7   , 0.9       )   }
						,{ id:'',coords:that.setCircPosition( 12.65 , 7.76  , 0.9       )   }
					];

		that.link_coords = that.setRectPosition( 20.2 , 1.5 , 7 , 1.2 );

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
		,close:function(){
			location.href = this.appLink;
		}
		,link:function(){
			console.log('---');
			// location.href = `event_detail.html?custNo=06963958&brandCd=V00A012B012&uid=undefined`;
			location.href = `event_detail.html?custNo=${this.key_custNo}&uid=${this.key_uid}`;
		}

	}
});