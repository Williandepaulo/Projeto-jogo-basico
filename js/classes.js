class Character { 
    
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0; 

    constructor(name) { 
        this.name = name;
    }

    get life() { 
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) { 
        super(name);
        this.life = 100;
        this.attack = 11;
        this.defense = 10;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character { 
    constructor(name) { 
        super(name);
        this.life = 85;
        this.attack = 22;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character { 
    constructor() { 
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character { 
    constructor() { 
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage { 
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
         this.fighter1 = fighter1;
         this.fighter2 = fighter2;
         this.fighter1El = fighter1El;
         this.fighter2El = fighter2El;
         this.logObject = logObject;
    }

    start() { 
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack( this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack( this.fighter2, this.fighter1));
    }
    
    update() { 
        // Fighter 1
        const f1Bar = this.fighter1El.querySelector('.bar'); 
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;

        
        if (f1Pct > 50) {
            f1Bar.style.backgroundColor = 'green';  
        } else if (f1Pct > 20) {
            f1Bar.style.backgroundColor = 'yellow';  
        } else {
            f1Bar.style.backgroundColor = 'red';  
        }
    
        
        f1Bar.style.width = `${f1Pct}%`;
    
        // Fighter 2
        const f2Bar = this.fighter2El.querySelector('.bar'); 
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    
        
        if (f2Pct > 50) {
            f2Bar.style.backgroundColor = 'green';  
        } else if (f2Pct > 20) {
            f2Bar.style.backgroundColor = 'yellow';  
        } else {
            f2Bar.style.backgroundColor = 'red';  
        }
    
        
        f2Bar.style.width = `${f2Pct}%`;
    }
    

    doAttack(attacking, attacked) { 
        if (attacking.life <= 0) {
            this.logObject.addMessage(`${attacking.name} está morto e não pode atacar!`); 
            return;
        }
        
        if(attacking.life <= 0 || attacked.life <= 0){
            this.logObject.addMessage('Oponente derrotado.');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() *2).toFixed(2)

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;
        
        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.logObject.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else { 
            this.logObject.addMessage(`${attacked.name} conseguiu defender...`);
        }

        this.update();
    }
}

class Log { 
    list = [];
    
    constructor(listE1) { 
        this.listE1 = listE1;
    }

    addMessage(msg) { 
        this.list.push(msg);
        this.render();
    }

    render() { 
        this.listE1.innerHTML = '';

        for (let i in this.list) { 
            this.listE1.innerHTML += `<li>${this.list[i]}</li>`;
        }

        this.listE1.scrollTop = this.listE1.scrollHeight;
    }
}