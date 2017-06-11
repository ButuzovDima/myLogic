let rep = document.getElementById('reply');
let canvas = document.getElementById('canvas');
let circle = canvas.getContext('2d');
let circle_line = canvas.getContext('2d');
let ctx = canvas.getContext('2d');
let circle_and = canvas.getContext('2d');

//создаем класс текст
let Ctx = function(text, x, y){
    this.text = text;
    this.x = x;
    this.y = y;
    //метод для написания текста
    this.wr = function(){
        ctx.fillStyle = 'black';
        ctx.font = '15pt Arial';
        ctx.fillText(this.text, this.x, this.y);
    };
};

//создаем класс Circle
let Circle = function(x, y, color, gco){
    this.x = x;
    this.y = y;
    this.color = color;
    this.gco = gco;
    //метод для отрисовки фигур.
    this.draw = function(){
        circle.globalCompositeOperation = this.gco;
        circle.beginPath(); //beginPath используется что бы «начать» серию действий описывающих отрисовку фигуры
        //Каждый новый вызов beginPath сбрасывает все действия предыдущего и начинает «рисовать» занова.
        circle.arc(this.x, this.y, 100, 0, Math.PI*2, true);
        circle.fillStyle = this.color;
        circle.fill(); //заливает фигуру сплошным цветом
    };
};

//создаем класс окружностей
let Circle_line = function(x, y, color, gco){
    this.x = x;
    this.y = y;
    this.color = color;
    this.gco = gco;
    this.draw = function(){
        circle_line.globalCompositeOperation = this.gco;
        circle_line.beginPath();
        circle_line.arc(this.x, this.y, 100, 0, Math.PI*2, true);
        circle_line.strokeStyle = this.color;
        circle_line.stroke();
    };
};

//создаем класс пересечения кругов
let Circle_and = function(x1,y1,x2,y2,color){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.draw = function(){
        circle_and.beginPath();
        circle_and.arc(this.x1,this.y1,100,0,Math.PI*2, true);
        circle_and.fillStyle = this.color;
        circle_and.fill();
        circle_and.globalCompositeOperation = 'source-in';
        circle_and.beginPath();
        circle_and.arc(this.x2,this.y2,100,0,Math.PI*2, true);
        circle_and.fillStyle = this.color;
        circle_and.fill();
    }
};

//функция пересечения
let inter = function(a,b){
    let m = [];
    let k = 0;
    let p = [];
    p[0] = null;
    let n = false;

    for(let i = 0; i < a.length; i++)
    {
        for(let j = 0; j < b.length; j++)
        {
            n = false;
            for(let t = 0; t < p.length; t++)
            {
                if(j === p[t])
                {
                    n = true;
                    break;
                }
            }
            if(n === false)
            {
                if(a[i] === b[j])
                {
                    m[k] = a[i];
                    p[k] = j;
                    k = k + 1;
                    break;
                }
            }
        }
    }
    return m;
};

//функция вычитания
let subtr = function(a,b){
    let m = [];
    let k = 0;
    let t;
    for(let i = 0; i < a.length; i++)
    {
        t = true;
        for(let j = 0; j < b.length; j++)
        {
            if(a[i] === b[j])
            {
                delete b[j];
                t = false;
                break;
            }
        }
        if(t)
        {
            m[k] = a[i];
            k = k + 1;
        }
    }
    return m;
};

//функция сложения
let un = function(a,b){
    let m = [];
    let k = 0;
    let t;

    for(let i = 0; i < a.length; i++)
    {
        t = true;
        for(let j = 0; j < b.length; j++)
        {
            if(a[i] === b[j])
            {
                t = false;
                m[k] = a[i];
                k++;
                delete b[j];
                break;
            }
        }
        if(t)
        {
            m[k] = a[i];
            k++;
        }
    }
    for(j = 0; j < b.length; j++)
    {
        if(b[j] !== undefined)
        {
            m[k] = b[j];
            k++;
        }
    }
    return m;
};

//событие на кнопку Очистить (вариант 1)
let _clear = function(){
    circle.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('id_a').value = '';
    document.getElementById('id_b').value = '';
    rep.innerHTML = 'Введите значения множества  A и B';
};

//событие на кнопку Очистить (вариант 2)
/*clear.onclick = function(){
    circle.clearRect(0, 0, canvas.width, canvas.height); //очищает canvas
}*/

//событие на кнопку "пересечения"
intersection.onclick = function(){
    let a = document.getElementById('id_a').value;
    let b = document.getElementById('id_b').value;
    let k_a = 0;
    let k_b = 0;
    let arr_a = [];
    let arr_b = [];
    let str = '';
    let err = false;
    let _inter;
    let t = false;
    let ctxA, ctxB;
    let circleA, circleB;
    let circleAnd;

    if(a[0]=== '{')
    {
        for(let i = 1; i < a.length; i++)
        {
            switch (a[i])
            {
                case ',': arr_a[k_a] = str;
                          k_a = k_a + 1;
                          str = '';
                          continue;
                case '}': arr_a[k_a] = str; break;
                default: str = str + a[i];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_a);

    str = '';
    if(b[0] === '{')
    {
        for(let j = 1; j < b.length; j++)
        {
            switch (b[j])
            {
                case ',': arr_b[k_b] = str;
                          k_b = k_b + 1;
                          str = '';
                          continue;
                case '}': arr_b[k_b] = str; break;
                default:  str = str + b[j];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_b);

    if(!err)
    {
        circle.clearRect(0, 0, canvas.width, canvas.height); //очищает canvas
        circle_line.clearRect(0, 0, canvas.width, canvas.height);
        circle_and.clearRect(0, 0, canvas.width, canvas.height);

        _inter = inter(arr_a, arr_b);
        for(let i = 0; i < _inter.length; i++){
            if(_inter[i] !== undefined){
                t = true;
                break;
            }
        }

        if(t){
            if(arr_a.length === arr_b.length){
                circleA = new Circle(200, 200, '#0075B2', 'source-over');
                circleA.draw();
                ctxA = new Ctx('A , B',180, 200);
                ctxA.wr();

            }
            else{
                circleAnd = new Circle_and(150,150,250,250, '#0075B2');
                circleAnd.draw();
                circleA = new Circle_line(150, 150, '#0075B2', 'source-over');
                circleA.draw();
                ctxA = new Ctx('A',150, 150);
                ctxA.wr();
                circleB = new Circle_line(250, 250, '#0075B2', 'destination-over');
                circleB.draw();
                ctxB = new Ctx('B',250, 250);
                ctxB.wr();
            }
        }

        rep.innerHTML = 'A &#8743 B = ' + inter(arr_a,arr_b);
    }
    else
    {
        rep.innerHTML = 'Error';
    }
};

//событие на кнопку "объединение"
union.onclick = function() {
    let a = document.getElementById('id_a').value;
    let b = document.getElementById('id_b').value;
    let k_a = 0;
    let k_b = 0;
    let arr_a = [];
    let arr_b = [];
    let str = '';
    let err = false;
    let circleA;
    let circleB;
    let _inter;
    let t = false;
    let ctxA, ctxB;

    if(a[0]=== '{')
    {
        for(let i = 1; i < a.length; i++)
        {
            switch (a[i])
            {
                case ',': arr_a[k_a] = str;
                    k_a = k_a + 1;
                    str = '';
                    continue;
                case '}': arr_a[k_a] = str; break;
                default: str = str + a[i];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_a);

    str = '';
    if(b[0] === '{')
    {
        for(let j = 1; j < b.length; j++)
        {
            switch (b[j])
            {
                case ',': arr_b[k_b] = str;
                    k_b = k_b + 1;
                    str = '';
                    continue;
                case '}': arr_b[k_b] = str; break;
                default:  str = str + b[j];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_b);

    if(!err)
    {
        circle.clearRect(0, 0, canvas.width, canvas.height); //очищает canvas
        circle_line.clearRect(0, 0, canvas.width, canvas.height);
        circle_and.clearRect(0, 0, canvas.width, canvas.height);
        _inter = inter(arr_a,arr_b);
        for(let k = 0; k < _inter.length; k++){
            if(_inter[k] !== undefined){
                t = true;
                break;
            }
        }
        if(t){
            circleA = new Circle(150,150,'#0075B2', 'source-over');
            circleA.draw();
            ctxA = new Ctx('A',150,150);
            ctxA.wr();
            circleB = new Circle(250,250,'#0075B2', 'source-over');
            circleB.draw();
            ctxB = new Ctx('B',250,250);
            ctxB.wr();
        }
        else{
            if(arr_a.length !== 0 && arr_b.length !== 0){
                circleA = new Circle(150,150,'#0075B2', 'source-over');
                circleA.draw();
                ctxA = new Ctx('A',150,150);
                ctxA.wr();
                circleB = new Circle(290.5,290.5,'#0075B2', 'source-over');
                circleB.draw();
                ctxB = new Ctx('B',290.5,290.5);
                ctxB.wr();
            }
            if(arr_a.length !== 0 && arr_b.length === 0){
                circleA = new Circle(150,150,'#0075B2', 'source-over');
                circleA.draw();
                ctxA = new Ctx('A',150,150);
                ctxA.wr();
            }
            if(arr_a.length === 0 && arr_b.length !== 0){
                circleB = new Circle(290.5,290.5,'#0075B2', 'source-over');
                circleB.draw();
                ctxB = new Ctx('B',290.5,290.5);
                ctxB.wr();
            }
        }
        rep.innerHTML = 'A &#8744 B = ' + un(arr_a,arr_b);
    }
    else
    {
        rep.innerHTML = 'Error';
    }
};

//событие на кнопку "вычитание"
subtraction.onclick = function(){
    let a = document.getElementById('id_a').value;
    let b = document.getElementById('id_b').value;
    let k_a = 0;
    let k_b = 0;
    let arr_a = [];
    let arr_b = [];
    let str = '';
    let err = false;
    let _inter;
    let circleA, circleB;
    let t = false;
    let ctxA, ctxB;

    if(a[0]=== '{')
    {
        for(let i = 1; i < a.length; i++)
        {
            switch (a[i])
            {
                case ',': arr_a[k_a] = str;
                    k_a = k_a + 1;
                    str = '';
                    continue;
                case '}': arr_a[k_a] = str; break;
                default: str = str + a[i];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_a);

    str = '';
    if(b[0] === '{')
    {
        for(let j = 1; j < b.length; j++)
        {
            switch (b[j])
            {
                case ',': arr_b[k_b] = str;
                    k_b = k_b + 1;
                    str = '';
                    continue;
                case '}': arr_b[k_b] = str; break;
                default:  str = str + b[j];
            }
        }
    }
    else
    {
        err = true;
    }
    console.log(arr_b);

    if(!err)
    {
        circle.clearRect(0, 0, canvas.width, canvas.height); //очищает canvas
        circle_line.clearRect(0, 0, canvas.width, canvas.height);
        circle_and.clearRect(0, 0, canvas.width, canvas.height);
        _inter = inter(arr_a,arr_b);
        if(arr_a.length === _inter.length)
        {
            let tr = false;
            for(let k = 0; k < arr_a.length; k++)
            {
                if(arr_b[k] !== _inter[k])
                {
                    tr = true;
                    break;
                }
            }
            if(tr)
            {
                t = false;
            }
            else
            {
                t = true;
            }
            console.log(tr);
        }
        if(t)
        {
            rep.innerHTML = 'A \\ B = ' + subtr(arr_a,arr_b);
        }
        else
        {
            if(_inter.length === 0)
            {
                circleA = new Circle(150,150,'#0075B2', 'source-over');
                circleA.draw();
                ctxA = new Ctx('A', 150, 150);
                ctxA.wr();
            }
            else
            {
                circleA = new Circle(150,150,'#0075B2', 'source-over');
                circleA.draw();
                circleA = new Ctx('A', 150, 150);
                circleA.wr();
                circleB = new Circle(250,250,'white', 'source-over');
                circleB.draw();
            }
            rep.innerHTML = 'A \\ B = ' + subtr(arr_a,arr_b);
        }
    }
    else
    {
        rep.innerHTML = 'Error';
    }
};
//oo
