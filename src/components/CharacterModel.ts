export class Character {
    name: string = '';
    xp: number = 0;
    skillXP: number = 0;
    endeavorDice: number = 0;
    traits: Traits = new Traits;
    knacks: Knacks = new Knacks;
    health: Health = new Health;
    aspect: Aspect = new Aspect;
    targetNumber: number = 0;
    skills: Skill[] = [];
    archetypes: Archetype[] = [];
    manueversInvocations: ManueverInvocation[] = [];
    advantages: Advantage[] = [];
    weapons: Weapon[] = [];
    buffs: Buff[] = [];
}

export class Traits {
    [key: string]: number; // ? Allows indexing by a string
    brawn: number = 0;
    finesse: number = 0;
    resolve: number = 0;
    wits: number = 0;
    presence: number = 0;
}

export class Knacks {
    [key: string]: number; // ? Allows indexing by a string
    strike: number = 0;
    manipulate: number = 0;
    evade: number = 0;
    intervene: number = 0;
    endure: number = 0;
}

export class Health {
    [key: string]: number | string;  // This allows both numbers and strings as values
    wounds: number = 0;
    maxWounds: number = 0;
    woundCheck: string = ''; // No error, because we now allow string values too
}
export class Aspect {
    drives: string[] = [];
    troubles: string[] = [];
}



export class Skill {
    skill: string = '';
    rank: number = 0;
}


export class Archetype {
    archetype: string = '';
    style: string = '';
    initiate: string = '';
    adept: string = '';
    master: string = '';
}


export class ManueverInvocation {
    name: string = '';
    roll: string = '';
    action: string = '';
    description: string = '';
}



export class Advantage {
    name: string = '';
    description: string = '';
}



export class Weapon {
    size: string = '';
    weight: string = '';
    style: string = '';
    modifiers: string = '';
    attack: string = '';
    damage: string = '';
}

export class Buff {
    description: string = '';
}