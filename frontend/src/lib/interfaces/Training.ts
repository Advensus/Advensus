export interface ITraining {
    id: string;
    intitule: string;
}

export interface IProgram {
    id: string;
    intitule: string;
    description: string;
}

export interface ISubscription {
    id: string;
    edof: string;
    training_status: string;
    hour_worked: string;
    duration: string;
    start_session: Date | null | undefined | string;
    end_session: Date | null | undefined | string;
    formation: ITraining;
    level_start: string;
    level_end: string;
    lieu_formation: string;
    solde: string;
    montant_formation: string;
}
