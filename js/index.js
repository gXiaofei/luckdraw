(function ($) {
    var state = {
        drawState: 'stop', //抽奖状态（开始还是暂停）
        animateId: null, //抽奖动画id
        actionDraw: '四等奖', //当前抽奖奖项
        actionDrawMemberIndex: 0, //当前抽奖奖项的第几个人
        nowDrawedName: {}, //当前抽中奖的名字
        memberDataCopy: window.personData, //所有成员备份信息
        drawedList: [], // 获奖名单
        nameMapDrawed: [6, 4, 2, 1, 1]
    }
    var personData = window.personData;
    var btn = $('.btnStart button').eq(0);
    var modal = $('#modal');
    var confirmBtn = modal.find('button').eq(0);
    var shadow = $('#modal img').eq(0);
    // 点击确定隐藏modal
    confirmBtn.on('click', function () {
        modal.hide(300);
    })

    var speed = 300;
    // 开启抽奖
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
        var index = parseInt(Math.random() * state.memberDataCopy.length);
        setShowMember(state.memberDataCopy[index]);
        if (speed > 20) {
            speed -= 20;
            clearInterval(state.animateId);
            state.animateId = setInterval(start, speed);
        }
    }
    // 结束抽奖
    function stop() {
        // 随机一个数
        var index = parseInt(Math.random() * state.memberDataCopy.length);
        setShowMember(state.memberDataCopy[index]);
        if (speed < 300) {
            speed += 20;
            clearInterval(state.animateId);
            state.animateId = setInterval(stop, speed);
        } else {
            clearInterval(state.animateId);
            btn.attr('disabled', false);
            state.nowDrawedName = state.memberDataCopy[index];

            if (state.nowDrawedName.mid !== 1) {
                // 不是领导
                modal.find('p').eq(1).hide();
                state.drawedList.push(state.memberDataCopy[index]);
                state.actionDrawMemberIndex++;
            } else {
                // 是领导
                modal.find('p').eq(1).show();
            }

            modal.find('img').eq(0).attr('src', state.nowDrawedName.url);
            modal.find('.prizeWinner').eq(0).text(state.nowDrawedName.name);
            random(shadow);
            modal.show(300);

            // 抽到了的值要在数组中去掉
            state.memberDataCopy.splice(index, 1);
            console.log(state.nowDrawedName);
            console.log(state.memberDataCopy);
        }
    }
    // 将随机到的值显示到页面上
    var setShowMember = function (data) {
        $('.img img').eq(0).attr({
            src: data.url,
            name: data.name,
            mid: data.mid
        })
    }

    var random = function (shadow) {
        var arr = state.nameMapDrawed;
        modal.find('.prize').eq(0).text(state.actionDraw);
        if(state.nowDrawedName.mid !== 1){
            if(state.drawedList.length <= totalArr(0, arr)){
                // 四等奖
                $('#fourPrize').append($('<span>'+state.nowDrawedName.name+'</span>'));
                shadow.css({
                    boxShadow: '0px 0px 200px #fff'
                });
                if(state.drawedList.length === totalArr(0, arr)){
                    state.actionDraw = '三等奖';
                }
            }else if(state.drawedList.length <= totalArr(1, arr)){
                // 三等奖
                $('#thirdAward').append($('<span>'+state.nowDrawedName.name+'</span>'))
                shadow.css({
                    boxShadow: '0px 0px 200px #4da79c'
                });
                if(state.drawedList.length === totalArr(1, arr)){
                    state.actionDraw = '二等奖';
                }
            }else if(state.drawedList.length <= totalArr(2, arr)){
                // 二等奖
                $('#secondAward').append($('<span>'+state.nowDrawedName.name+'</span>'))
                shadow.css({
                    boxShadow: '0px 0px 200px #8b43c6'
                });
                if(state.drawedList.length === totalArr(2, arr)){
                    state.actionDraw = '一等奖';
                }
            }else if(state.drawedList.length <= totalArr(3, arr)){
                // 一等奖
                $('#theFirstPrize').append($('<span>'+state.nowDrawedName.name+'</span>'))
                shadow.css({
                    boxShadow: '0px 0px 200px #aa9041'
                });
                if(state.drawedList.length === totalArr(3, arr)){
                    state.actionDraw = '特等奖';
                }
            }else if(state.drawedList.length <= totalArr(4, arr)){
                // 特等奖
                $('#firstPrize').append($('<span>'+state.nowDrawedName.name+'</span>'))
                shadow.css({
                    boxShadow: '0px 0px 200px #9e0702'
                });
                if(state.drawedList.length === totalArr(4, arr)){
                    state.actionDraw = '';
                }
            }
        }
    }

    var totalArr = function (index, arr) {
        var total = 0;
        for(var i=0;i<arr.length;i++){
            if(i<=index){
                total += arr[i];
            }
        }
        return total;
    }


})(jQuery)