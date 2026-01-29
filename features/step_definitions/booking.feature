Feature: Booking movie tickets 

Scenario: Successful booking of one VIP seat on the next day
    Given user is on "/client/index.php" page
    When user selects the next day
    And user chooses the movie seance with modern hall
    And user books one VIP seat
    And user click on button "Забронировать"
    Then user should see confirmation "Вы выбрали билеты:"

Scenario: Successful booking of two standard seats on the next day
    Given user is on "/client/index.php" page
    When user selects the next day
    And user chooses the standart hall
    And user books two standard seats
    And user click on button "Забронировать"
    Then user should see confirmation "Вы выбрали билеты:"

  Scenario: Unsuccessful booking of a taken seat
    Given user is on "/client/index.php" page
    When user selects the next day
    And user chooses the standart hall
    And user trys to book a taken seat
    Then the "Book" button should be disabled