var personData = [];

var personName = ['伊泽瑞尔', '凯南', '凯特琳', '刀妹', '卡特琳娜', '嘉文四世', '塔里克', '奶妈', '安妮', '寒冰', '小丑', '崔斯特', '拉克丝', '拉莫斯', '提莫', '无极剑圣', '瑟庄妮', '盖伦', '莎娜', '薇恩', '阿木木', '阿狸'];

var leaderName = ['李青', '死歌', '流浪', '潘森', '瑞文', '蛮王', '赏金猎人', '赵信', '阿卡丽'];

personName.forEach(function (item){
    personData.push({
        url: './images/data/' + item + '.jpg',
        mid: 0,
        name: item
    });
});

leaderName.forEach(function (item){
    personData.push({
        url: './images/data/' + item + '.jpg',
        mid: 1,
        name: item
    })
})