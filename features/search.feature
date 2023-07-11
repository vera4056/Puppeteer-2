Feature: Movie website
    Scenario: Should book a ticket 
        Given user is on "/client/hall.php" page
        When user click on the button "day.page" and chose time and chair on ".buying-scheme"
        Then user sees the result "ЭЛЕКТРОННЫЙ БИЛЕТ"