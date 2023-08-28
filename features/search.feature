Feature: Movie website
    Scenario: Should book a ticket 
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user chooses "a.page-nav__day:nth-child(3)" day of show 
        And user chooses "a.movie-seances__time" show time 
        When user selects seat 3 in the row 3
        And user clicks ".acceptin-button"
        Then users sees a header "Электронный билет"


     