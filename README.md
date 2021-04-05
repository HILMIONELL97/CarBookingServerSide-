# CarBooking

La société ‘Tomorrow Cars’ vous demande de leur créer une application web pour leur prochain salon des automobiles. Pour répondre au besoin, il faut créer une application web utilisant Node.Js / Express Js / Mongo DB en backend et ReactJs en frontend,

En bref, le salon d’automobile va se passer comme suit :

• L’arrivée des propriétaires des voitures.

• Enregistrement des propriétaires via l’application

• Positionner les véhicules dans les coins réservés.

• L’arrivée des clients.

• Enregistrement des clients via l’application.

• Demande d’essai de la voiture (chaque client a le droit d’essayer un véhicule une seule fois, et le nombre max du véhicule essayé par quelqu’un est 10)

• Si un client est intéressé par une voiture, il peut négocier le prix et si les deux parties sont d'accord, un dépôt du chèque de réservation par le client doit être effectué.

Un propriétaire est composé de (Identifiant unique, CIN, Prénom, Nom, E-mail, RIB bancaire, Téléphone, Voitures à montrer [une ou plusieurs], N° place [un ou plusieurs]) Un client est composé de (Identifiant unique, CIN, Prénom, Nom, E-mail, Téléphone, Nombre d’essai total) Une voiture a (Identifiant unique, Matricule, Nom, Marque, Couleur, Prix, Carburant, un attribut [est_soldé] indique est ce que la voiture est disponible ou pas) L’opération de la réservation d’une voiture est représentée par une entité (Reserve_car) contient (id de la voiture, id du client, id du propriétaire, montant déposé, taux de réduction),

