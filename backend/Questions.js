const express = require("express");
const userRouter = express.Router();

//Images for questions not inserted yet
userRouter.get('/question',(req,res)=>{
    const idno = req.headers.questionID
    switch(idno){
        case 1:res.send({
            question:'Predict the next number in the sequence: 27, 1217, 11121117, 31123117, 132112122117, ?',
            image:'',
            stage:'0'
        })
        break;

        case 2:res.send({
            question:'YJR DP;IYOPM YP YJOD [IXX;R OD DOC VJSTSVYRTD SMF YJR MS,R PG YJR ,PDY VP,,PM LRUNPSTD ;SUPIY',
            image:'',
            stage:'82'
        })
        break;

        case 3:res.send({
            question:'gean spegel yn om troch te gean”',
            image:'',
            stage:'129'
        })
        break;

        case 4:res.send({
            question:'Enter Next Stage to proceed',
            image:'',
            stage:'275'
        })
        break;

        case 5:res.send({
            question:'\“Her heart must be ash where her body lies burned. What hope lets your hands rake the cold in real time?”\ from the poem Ghazal by Agha Shahid Ali.',
            image:'https://i.ibb.co/k2xXWzH/Stage371.png',
            stage:'371'
        })
        break;

        case 6:res.send({
            question:'4F 63 60 1B 31 6F 63 1B 68 6A 69 6F 63 1B 6A 61 1B 6F 63 60 1B 74 60 5C 6D',
            image:'https://i.ibb.co/Yb8PKDV/Stage649.jpg',
            stage:'649'
        })
        break;

        case 7:res.send({
            question:'25°46′31″N 80°12′32″W; 18°24′23″N 66°3′50″W; 32.293°N 64.782°W',
            image:'',
            stage:'793'
        })
        break;

        case 8:res.send({//inspect element question
            question:'The Tree of perseverance',
            image:'',
            stage:'1139'
        })
        break;

        case 9:res.send({
            question:'',
            image:'https://i.ibb.co/WG7DMRq/Stage1349.png',
            stage:'1349',
        })
        break;

        case 10:res.send({
            question:'ZIOL DTLLQUT OL DQRT OFZTFZOGFQSSN SGFU. OZ LIGVL IGV TFEGROFU DTLLQUTL OF ZIT TFUSOLI SQFUXQUT DTQFL ZIQZ LGDT STZZTKL QKT KTHTQZTR DXEI DGKT GYZTF EGDHQKTR ZG GZITKL. FG, ZIOL OL FGZ Q EKQHHN QZZTDHZ ZG KTDGCT QFN HQKZOEXSQK STZZTK YKGD ZIOL SOLZ, OZ\'L QF QWLGSXZTSN FGKDQS KQFRGD HQKQUKQHI. QF OFZTKTLZOFU ZKOCOQ YGK NGX OL ZIQZ ZIT STZZTKL GY ZIT QSHIQWTZ OF GKRTK EGKKTLHGFR ZG JVTKZN YKGD STYZ ZG KOUIZ, ZGH ZG WGZZGD. LG DXEI YGK ZIT HQKQUKQHI, ZIT QFLVTK NGX\'SS FTTR ZG TFZTK OL "DORRST',
            image:'',
            stage:'1679'
        })
        break;

        case 11:res.send({
            question:'An AI called the Blaze has taken over the systems of the tower in the island that it was housed in, and is threatening to hack past the security systems that keep it isolated from the internet. The tower is filled with water in the shaft that runs down the middle as part of an extensive cooling network for the electronics housed within the walls of the tower, and also acts like a way to cut the AI off from accessing the internet.\n You have found a way to drop a raft into the shaft, but your attempts at discretion fail and the AI detects you. Using a script that the scientists at base have given you, you manage to convince the AI into believing that it is not smart enough yet and that it needs to be shut down for updates. The AI agrees to shut down conditionally - you have to prove to it that it is not ready, by beating it at a game. Fortunately, the scientists at base have told you that the AI is not yet ready to play games and thus, you have a fair chance to win. Unfortunately, you have lost communication with base, and thus, you have to play to win. \n The AI wishes to drain the water in the cooling shaft because it wishes to access the internet without any barriers, and you wish to do the same so that you can access the root systems and shut it down. So the AI agrees that each of you can take turns lowering the level of water in the cooling shaft, which has twenty-five equally spaced stories. Control over lowering of water alternates between you and the AI, and the player who last lowers the water to reach level 0 is the one to win. You can lower the water level by either one, three or four stories each turn, and the AI has allowed you to go first. By how many levels of water should you lower the first time so as to not lose?',
            image:'',
            stage:'2291'
        }) 
        break;

        case 12:res.send({
            question:'Bitmaps for everything \n 1943649400226454864323078213947298791219708235610377936278487807218106013986396590911876898105922007137092023477803389332642195019033509728607498616458666957183915143874786295873756244161440805490710479072111177527046374896538531271755521371266985083999576785959745789942233164037076586977022657737026642410289297893440920582701127796893685682935466881612024985417343461802041506173965785877308515731432969868991699259388567581828024801685405696',
            image:'',
            stage:'2573'
        })
        break;

        case 13:res.send({
            question:'Hope you’ve been paying attention! What is this round’s number?',
            image:'',
            stage:'?'
        })
        break;

        case 14:res.send({
            question:'',
            image:'https://i.ibb.co/QFxT3CJ/Stage14.png',
            stage:'14',
        })
        break;

        case 15:res.send({
            question:'',
            image:'',//Image not found
            stage:'15'
        })
        break;

        case 16:res.send({
            question:'epp 60 lru  ?',
            image:'',
            stage:'16'
        })
        break;

        case 17:res.send({
            question:'Decode the information hidden in this chessboard which is the name of something. Where was this something formed? ',
            image:'https://i.ibb.co/6wgHvS4/Stage17.png',
            stage:'17'
        })
        break; 

        case 17:res.send({
            question:'Decode the information hidden in this chessboard which is the name of something. Where was this something formed? ',
            image:'https://i.ibb.co/6wgHvS4/Stage17.png',
            stage:'17'
        })
        break; 

        case 18:res.send({
            question:'',
            image:'https://i.ibb.co/92xf4RH/Stage18.jpg',
            stage:'18'
        })
        break; 

        default: console.log('Invalid id')
    }    
})
userRouter.get('/submitAnswer',(req,res)=>{
    const Ans=req.userAnswer
    const UserAns=Ans.toLowerCase()
    const UserAnsFin=UserAns.trim()
    const id=req.id

    switch(id){
        case 1: if(UserAnsFin==='111312211211222117')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 2: if(UserAnsFin==='qwerty')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 3: if(UserAnsFin==='mirror')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 4: if(UserAnsFin==='next stage')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 5: if(UserAnsFin==='daniel hall')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 6: if(UserAnsFin==='caesar')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 7: if(UserAnsFin==='sinking ship')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 8: if(UserAnsFin==='moxie')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 9: if(UserAnsFin==='beepboopenterbot')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 10: if(UserAnsFin==='middle')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 11: if(UserAnsFin==='4')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 12: if(UserAnsFin==='pacman')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 13: if(UserAnsFin==='3293')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 14: if(UserAnsFin==='cheese')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 15: if(UserAnsFin==='rome')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 16: if(UserAnsFin==='a minor')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        case 17: if(UserAnsFin==='minneapolis')
                res.send({response: 'true'})
                else
                res.send({response:'false'})
                break;
        default: console.log('Invalid id')
    }
})
