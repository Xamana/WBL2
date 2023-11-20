const warior = {
    human: {
        infantry: {
            life: 10,
            atack: 5,
            defense: 10,
            speed: 2,
        },
        rider: {
            life: 10,
            atack: 10,
            defense: 5,
            speed: 3,
            horses: true,
        },
        wizzard: {
            life: 10,
            atack: 0,
            defense: 0,
            speed: 2,
        }
    },
    elf: {
        archer: {
            life: 10,
            atack: 8,
            defense: 2,
            speed: 2,
        },
    },
    orc: {
        light: {
            life: 15,
            atack: 0,
            defense: 0,
            speed: 2,
        },
        heavy: {
            life: 15,
            atack: 0,
            defense: 0,
            speed: 1,
        },
    },
}

const side = {
    radiant: {
        human: {
            infantry: 10,
            rider: 10,
            wizzard: 10,
        },
        elf: {
            archer: 10,
        },
        orc: {
            light: 10,
            heavy: 10,
        }
    },
    dire: {
        human: {
            infantry: 10,
            rider: 10,
            wizzard: 10,
        },
        elf: {
            archer: 10,
        },
        orc: {
            light: 10,
            heavy: 10,
        }
    }
}


function move() {
    let attacer = 'radiant'; // 'radiant' or 'dire'
    const radiantHP = {
        human: {
            infantry: (side.radiant.human.infantry * warior.human.infantry.life),
            rider: (side.radiant.human.rider * warior.human.rider.life),
            wizzard: (side.radiant.human.wizzard * warior.human.wizzard.life),
        },
        elf: {
            archer: (side.radiant.elf.archer * warior.elf.archer.life),
        },
        orc: {
            light: (side.radiant.orc.light * warior.orc.light.life),
            heavy: (side.radiant.orc.heavy * warior.orc.heavy.life),
        }
    }
    const direHP = {
        human: {
            infantry: (side.dire.human.infantry * warior.human.infantry.life),
            rider: (side.dire.human.rider * warior.human.rider.life),
            wizzard: (side.dire.human.wizzard * warior.human.wizzard.life),
        },
        elf: {
            archer: (side.dire.elf.archer * warior.elf.archer.life),
        },
        orc: {
            light: (side.dire.orc.light * warior.orc.light.life),
            heavy: (side.dire.orc.heavy * warior.orc.heavy.life),
        }
    }
    
}
