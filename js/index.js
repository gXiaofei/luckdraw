(function ($) {
    var state = {
        drawState: 'stop', //抽奖状态（开始还是暂停）
        animateId: null, //抽奖动画id
        actionDrawIndex: 0, //当前抽奖奖项
        actionDrawMemberIndex: 0, //当前抽奖奖项的第几个人
        nowDrawedName: '', //当前抽中奖的名字
        memberDataCopy: window.personData, //所有成员备份信息
        hideModalType: '', //关闭modal的类型
    }
    var personData = window.personData;
    var btn = $('.btnStart button').eq(0);

    var speed = 300;
    btn.on('click', function () {
        if (state.drawState === 'stop') {
            // 开始
            state.drawState = 'start';
            $(this).html('结束');
            clearInterval(state.animateId);
            state.animateId = setInterval(function () {
                start();
            }, speed);
        } else {
            // 结束
            state.drawState = 'stop';
            $(this).html('开始');
            $(this).attr('disabled', true);
            clearInterval(state.animateId);
            state.animateId = setInterval(function () {
                stop();
            }, speed);
        }
    })
    // 开始抽奖
    function start() {
        var index = parseInt(Math.random() * state.memberDataCopy.length-1);
        setShowMember(state.memberDataCopy[index]);
        if (speed > 20) {
            speed -= 20;
            clearInterval(state.animateId);
            state.animateId = setInterval(start, speed);
        }
    }
    // 结束抽奖
    function stop() {
        var index = parseInt(Math.random() * state.memberDataCopy.length-1);
        setShowMember(state.memberDataCopy[index]);
        if (speed < 300) {
            speed += 20;
            clearInterval(state.animateId);
            state.animateId = setInterval(stop, speed);
        } else {
            clearInterval(state.animateId);
            btn.attr('disabled', false);

            for(let i=0;i<state.memberDataCopy.length;i++){
                if(state.memberDataCopy[i].name === state.memberDataCopy[index].name){
                    state.memberDataCopy.splice(i,1);
                    break;
                }
            }
            

            console.log(state.memberDataCopy);
        }
    }

    var setShowMember = function (data) {
        $('.img img').eq(0).attr({
            src: data.url,
            name: data.name,
            mid: data.mid
        })
    }



})(jQuery)