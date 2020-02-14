# 02 - ThatsApp Tests

Laten we ons domain model en de store aan enkel tests onderwerpen.
* Voeg jest toe via yarn
* Maak een script aan `test` waarmee je `jest` kan runnen. Net zoals we `yarn dev` runnen.
  * Het kan handig zijn om een script `test:watch` aan te maken waarmee je `jest` met de watch flag runt.

## Message
* Start met de `Message` class uit de vorige oefening te kopiëren.
* Maak een nieuwe class aan `Message.test.js`, hierin schrijf je de volgende tests: (en run de tests uiteraard)
  * Als je een nieuw `Message` object aanmaakt, zijn alle properties dan correct ingevuld?
  * Als je een nieuw `Message` object aanmaakt dat ongelezen is, is die specifieke property dan correct?
  * Als je de method `setAsRead` gebruikt, is die `unread` property dan correct aangepast?

## Store
* Start met de `Store` class uit de vorige oefening te kopiëren.
* Maak een nieuwe class aan `Store.test.js`, hierin schrijf je de volgende tests: (en run de tests uiteraard)
  * Als je een nieuwe `Store` aanmaakt, is het aantal messages dan 0?
  * Als je de store seed met een `Message` object, is het aantal messages dan 1?
  * Als je een message toevoegt via de `addMessage` functie
    * Is het aantal messages dan 1?
    * Heeft deze eerste message dan `1` als `user`?
    * Is de `unread` van deze eerste message dan `false`?
  * Als je een nieuwe `Store` aanmaakt en je seed deze met een ongelezen message:
    * Is de waarde van `unreadLength` dan gelijk aan 1?
    * Als je de `setUnread` van eerste message op false zet, is de waarde van `unreadLength` gelijk aan 0?
