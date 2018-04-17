remSize();
window.addEventListener('resize',function() {
	remSize();
});
function remSize() {
	let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
	let htmlDom = document.getElementsByTagName('html')[0];
	htmlDom.style.fontSize = htmlWidth / 10 + 'px';
}


