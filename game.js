function startGame() {
    class Road {
        constructor(image, y) {
            this.x = 0;
            this.y = y;
            this.loaded = false;

            this.image = new Image();

            let obj = this;

            this.image.addEventListener("load", function () {
                obj.loaded = true;
            });

            this.image.src = image;
        }

        Update(road) {
            this.y += speed; //движение изображения вниз
            if (this.y > window.innerHeight) { //если изображение покинуло экран, то меняется положение

                this.y = road.y - canvas.width + speed; //новое положение зависит от следующего объекта
            }
        }
    }

    class Car {
        constructor(image, x, y, isPlayer) {
            this.x = x;
            this.y = y;
            this.loaded = false;
            this.dead = false;
            this.isPlayer = isPlayer;

            this.image = new Image();

            let obj = this;

            this.image.addEventListener("load", function () {
                obj.loaded = true;
            });

            this.image.src = image;
        }

        Update() {
            if (!this.isPlayer) {
                this.y += speed;
            }

            if (this.y > canvas.height + 50) {
                this.dead = true;
            }
        }

        Collide(car) {
            let hit = false;

            if (this.y < car.y + car.image.height * scale && this.y + this.image.height * scale > car.y) { //если столкновение по у

                if (this.x + this.image.width * scale > car.x && this.x < car.x + car.image.width * scale) { //если столкновение по х
                    hit = true;

                }
            }

            return hit;
        }

        Move(v, d) {
            if (v == "x") { //передвиж по х

                d *= 2;

                this.x += d; //смена позиции

                //если автомобиль покинул экран, то возврат изменений
                if (this.x + this.image.width * scale > canvas.width) {
                    this.x -= d;

                }

                if (this.x < 0) {
                    this.x = 0;
                }
            } else { //передвиж по у

                this.y += d;

                if (this.y + this.image.height * scale > canvas.height) {
                    this.y -= d;
                }

                if (this.y < 0) {
                    this.y = 0;
                }
            }

        }
    }


    const UPDATE_TIME = 1000 / 60;

    let timer = null;

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let scale = 0.2; //масштаб машин

    Resize(); //получение холста дороги на экране

    window.addEventListener("resize", Resize); //изменение размера холста в соответствии с размерами экрана

//для нормальной работы на мобильн устр.
    canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        return false;
    });

    window.addEventListener("keydown", function (e) {
        KeyDown(e);
    }); //получение событий с клавиатуры

    let objects = []; //игровые объекты

    let roads =
        [
            new Road("images/road.jpg", 0),
            new Road("images/road.jpg", canvas.width)
        ]; //фон

    let player = new Car("images/car.png", canvas.width / 2, canvas.height / 2, true); //машина игрока


    let speed = 5;

    Start();


    function Start() {
        thisDate = new Date();
        startTime();
        if (!player.dead) {
            timer = setInterval(Update, UPDATE_TIME); //обновление игры раз в 60 сек
        }

    }

    function stopGame() {
        
        const result = endTime();
        const user =  JSON.parse(localStorage.getItem('user'));
        let records = JSON.parse(localStorage.getItem('records'));
        const resultRecord = {
            userName: user.name,
            timeSting: result.timeSting,
            result: result.time
        };

        const wrapper = document.getElementById('wrapper')
        
        if (wrapper) {
            wrapper.appendChild(createModel(result));
            showModel();
        }
        

        if (!records) {
            records = [];
        }

        records.push(resultRecord);
        console.log(user, result, records);

        localStorage.setItem('records', JSON.stringify(records));

        clearInterval(timer);
        timer = null;
    }

    function Update() {
        roads[0].Update(roads[1]);
        roads[1].Update(roads[0]);

        if (SPAState.pageName !== 'Game') {
            stopGame();
        }

        if (RandomInteger(0, 215) > 210) { //создание новых машин

            objects.push(new Car("images/carMale.png", RandomInteger(400, canvas.width - 400), RandomInteger(1000, 1200) * -1));
        }

        player.Update();

        if (player.dead) {
            showModel()
            stopGame();
        }

        let isDead = false;

        for (let i = 0; i < objects.length; i++) {
            objects[i].Update();

            if (objects[i].dead) {
                isDead = true;
            }
        }

        if (isDead) {
            objects.shift();
        }

        let hit = false;

        for (let i = 0; i < objects.length; i++) {
            hit = player.Collide(objects[i]);

            if (hit) {
               
                stopGame();
                player.dead = true;
                break;
            }
        }

        Draw();
    }

    function Draw() { //работа с графикой

        ctx.clearRect(0, 0, canvas.width, canvas.height); //очистка канваса
        for (let i = 0; i < roads.length; i++) {
            ctx.drawImage
            (
                roads[i].image, //картинка
                0, //первый х изображения
                0, //первый у
                roads[i].image.width, //последний х
                roads[i].image.height, //последний у
                roads[i].x, //х
                roads[i].y, //Y
                canvas.width, //ширина
                canvas.width //высота (для того, чтобы картинка шла друг за другом)
            );
        }

        DrawCar(player);

        for (let i = 0; i < objects.length; i++) {
            DrawCar(objects[i]);
        }
    }

    function DrawCar(car) {
        ctx.drawImage
        (
            car.image,
            0,
            0,
            car.image.width,
            car.image.height,
            car.x,
            car.y,
            car.image.width * scale,
            car.image.height * scale
        );
    }

    function KeyDown(e) {
        switch (e.keyCode) {

            case 37:
                player.Move("x", -speed);
                break;

            case 39:
                player.Move("x", speed);
                break;

            case 38:
                player.Move("y", -speed);
                break;

            case 40:
                player.Move("y", speed);
                break;

            case 27:
                if (timer == null) {
                    Start();
                } else {
                    stopGame();
                }
                break;
        }
    }

    function Resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function RandomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    

    function createModel(result){
        const model = document.createElement('div');
        const title = document.createElement('h2');
        const buttonEnd = document.createElement('button');
        const buttonResult=document.createElement('button');
        const buttonReturn=document.createElement('button');
        const buttonMain=document.createElement('button');


        model.setAttribute('id', 'model');
        model.className = 'model';
        
        model.append(title);
        model.append(buttonEnd);
        model.append(buttonResult);
        model.append(buttonReturn);
        model.append(buttonMain);
        title.innerText = `Вы проиграли, ваш результать \n ${result.timeSting}`;
        buttonEnd.innerText='Выйти'
        buttonResult.innerText='Рекорды'
        buttonReturn.innerText='Играть заново'
        buttonMain.innerText='На главную';

        buttonEnd.addEventListener('click', () => {
            hideModel();
            switchToState({pageName: 'Login'});
        })
    
        buttonResult.addEventListener('click', () => {
            hideModel();
            switchToState({pageName: 'Record'});
        })

        buttonMain.addEventListener('click', () => {
            hideModel();
            switchToState({pageName: 'Main'});
        })
    
        buttonReturn.addEventListener('click', () => {
            hideModel();
            startGame();
        })

        buttonEnd.className = 'btn btn-primary';
        buttonResult.className = 'btn btn-primary';
        buttonMain.className = 'btn btn-primary';
        buttonReturn.className = 'btn btn-primary';

                
        return model;
    }
    
    function showModel() {
        const model = document.getElementById('model');

        model.classList.add("show")
        
    };
    
    const hideModel = () => {
        const model = document.getElementById('model');

        model.classList.remove("show")      
    }
}
