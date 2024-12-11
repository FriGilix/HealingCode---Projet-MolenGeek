// Patient
class patient{
    constructor(nom, maladie, argent){
        this.nom = nom
        this.maladie = maladie
        this.argent = argent
        this.poche = "vide"
        this.sante = "malade"
    }

    goTo(place){
        console.log(`${this.nom} se rend à ${place}.`)
    }

    takeMedicament(medicament) {
        if (this.poche === medicament){
            this.sante = "guéri"
            console.log(`${this.nom} a pris ${medicament} et est maintenant ${this.sante}.`)
        } else {
            console.log(`${this.nom} n'a pas le bon médicament pour guérir.`)
        }
    }

    paye(quantite){
        if (this.argent >= quantite){
            this.argent -= quantite
            console.log(`${this.nom} a payé ${quantite}€. Il lui reste ${this.argent}€`)
            return true
        } else {
            console.log(`${this.nom} n'a pas assez d'argent pour payer ${quantite}€.`)
            return false
        }
    }
}


// Chat de merde
function miaulementChat(){
    setInterval(() =>{
        console.log("Le Sphynx miaule : 'Miaou !'")
    }, 2000)
}

miaulementChat()

// Docteur
class docteur{
    constructor(){
        this.nom = "Debugger"
        this.argent = 0
        this.bureau = ["chat"]
        this.patientIn = null
    }

    diagnostics(patient){
        const diagnostics ={
            "mal indenté": "ctrl+maj+f",
            "unsave": "saveOnFocusChange",
            "404": "CheckLinkRelation",
            "azmatique": "Ventoline",
            "syntaxError": "f12+doc"
        }

        const traitement = diagnostics[patient.maladie]
        console.log(`${this.nom} diagnostique ${patient.nom} avec ${patient.maladie}. Traitement prescrit : ${traitement}`)
        return traitement
    }

    receptionPatient(patient){
        if (this.patientIn){
            console.log(`Le cabinet est occupé. ${patient.nom} doit attendre.`)
        } else {
            this.patientIn = patient
            console.log(`${patient.nom} entre dans le cabinet.`)
        }
    }

    traitementPatient(){
        if (this.patientIn){
            if (this.patientIn.paye(50)){
                this.argent += 50
                const traitement = this.diagnostics(this.patientIn)
                this.patientIn.poche = traitement
                console.log(`${this.patientIn.nom} quitte le cabinet avec ${traitement} dans sa poche.`)
                this.patientIn = null
            } else {
                console.log(`${this.patientIn.nom} n'a pas pu payer la consultation.`)
                this.patientIn = null
            }
        } else {
            console.log("Aucun patient dans le cabinet")
        }
    }
}


// Pharmacie
class pharmacie{
    constructor(){
        this.traitement ={
            "ctrl+maj+f": 60,
            "saveOnFocusChange": 100,
            "CheckLinkRelation": 35,
            "Ventoline": 40,
            "f12+doc": 20
        }
    }

    venteTraitement(patient){
        console.log("Bienvenue à la pharmacie.")
        const prixTraitement = this.traitement[patient.poche]

        if (prixTraitement && patient.paye(prixTraitement)){
            console.log(`${patient.nom} achète ${patient.poche} pour ${prixTraitement}€.`)
            patient.takeMedicament(patient.poche)
        } else {
            console.log(`${patient.nom} ne peut pas acheter ${patient.poche}. Il est mort.`)
            console.log(`Annonce nécrologique : ${patient.nom}, souffrant de ${patient.maladie}, est décédé faute de traitement.`)
        }
    }
}


// Fiche des patients
const patients = [
    new patient("Marcus", "mal indenté", 100),
    new patient("Optimus", "unsave", 200),
    new patient("Sangoku", "404", 80),
    new patient("DarthVader", "azmatique", 110),
    new patient("Semicolon", "syntaxError", 60)
]

// Docteur et Pharmacie
const doctor = new docteur()
const pharmacy = new pharmacie()





// Consultation et Traitements
for (const patient of patients){
    patient.goTo("le cabinet du docteur")
    doctor.receptionPatient(patient)
    doctor.traitementPatient()

    if (patient.sante !== "guéri"){
        patient.goTo("la pharmacie")
        pharmacy.venteTraitement(patient)
    }
}


console.log("Simulation terminée.")