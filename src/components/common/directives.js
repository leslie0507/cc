import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('drag', {
    bind: function(el, binding) {
        el.style.position ='absolute';
        el.onmousedown = function(e) {
            var startX = e.clientX - el.offsetLeft;
            var startY = e.clientY - el.offsetTop;
            console.log(el.offsetTop,el.offsetLeft)
            e.preventDefault()
            document.onmousemove = function(e) {
                var endX = e.clientX - startX;
                var endY = e.clientY- startY;
                el.style.left = endX  + 'px';
                el.style.top = endY  + 'px';
            }
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
                
        }
    },
})
