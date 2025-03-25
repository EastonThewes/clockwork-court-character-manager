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
    skills: Skills = new Skills;
    archetypes: Archetypes = new Archetypes;
    manueversInvocations: ManueversInvocations = new ManueversInvocations;
    advantages: Advantages = new Advantages;
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
    [key: string]: number; // ? Allows indexing by a string
    wounds: number = 0;
    maxWounds: number = 0;
    woundCheck: number = 0;
}

export class Aspect {
    drives: string[] = [];
    troubles: string[] = [];
}

export class Skills {
    skills: Skill[] = [];
}

export class Skill {
    skill: string = '';
    rank: number = 0;
}

export class Archetypes {
    archetypes: Archetype[] = [];
}
export class Archetype {
    archetype: string = '';
    initiate: string = '';
    adept: string = '';
    master: string = '';
}

export class ManueversInvocations {
    manueversInvocations: ManueverInvocation[] = [];
}

export class ManueverInvocation {
    name: string = '';
    roll: string = '';
    action: string = '';
    description: string = '';
}

export class Advantages {
    advantages: Advantage[] = [];
} 

export class Advantage {
    name: string = '';
    description: string = '';
}