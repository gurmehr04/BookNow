angular.module('projApp', [])
    .controller('loginController', function ($scope, $window, $http) {
        
        var storedCredentials = [
            { email: 'user1@example.com', password: 'Password123' },
            { email: 'xyz@gmail.com', password: 'Password@123' },
        ];

        $scope.formData = {};

        $scope.login = function () {
            
            var found = storedCredentials.some(function(credential) {
                return credential.email === $scope.formData.email && credential.password === $scope.formData.password;
            });

            if (found) {
                $window.location.href = 'nextpage.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        };
    })
    
    .controller('movieController', function ($scope, $http) {
        $scope.selectedCity = "";
        $scope.showTicketModal = false;
        $scope.numTickets = 1; 
        $scope.searchQuery = ''; 
    
        $scope.selectCity = function(city) {
            $scope.selectedCity = city;
            $scope.filterMovies();
        };
        $scope.movies = [
            {
                name: 'Deadpool & Wolverine',
                image: '/photos/post1.png',
                showtimes: ['Show 1: 10:00 AM', 'Show 2: 1:00 PM', 'Show 3: 4:00 PM' ],
                city: 'Dehradun'
            },
            {
                name: 'Bad Boys: Ride or Die',
                image: '/photos/post2.webp',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 3:00 PM', 'Show 3: 5:00 PM'],
                city: 'Delhi'
            },
            {
                name: 'Joker: Folie à Deux',
                image: '/photos/post3.png',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 3:00 PM', 'Show 3: 5:00 PM'],
                city: 'Mumbai'
            },
            {
                name: 'The Fall Guy',
                image: '/photos/post4.png',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 3:00 PM', 'Show 3: 5:00 PM'],
                city: 'Pune'
            },
            {
                name: 'GHOSTBUSTERS: FROZEN EMPIRE',
                image: '/photos/post5.png',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 3:00 PM', 'Show 3: 5:00 PM'],
                city: 'Chandigarh'
            },
            {
                name: 'DESPICABLE ME 4',
                image: '/photos/post6.png',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 3:00 PM', 'Show 3: 5:00 PM'],
                city: 'Delhi'
            },
            {
                name: 'Avengers: Endgame',
                image: '/photos/post7.png',
                showtimes: ['Show 1: 9:00 AM', 'Show 2: 12:00 PM', 'Show 3: 3:00 PM'],
                city: 'Dehradun'
            },
            {
                name: 'Inception',
                image: '/photos/post8.png',
                showtimes: ['Show 1: 11:00 AM', 'Show 2: 2:00 PM', 'Show 3: 5:00 PM'],
                city: 'Dehradun'
            },
            {
                name: 'The Dark Knight',
                image: '/photos/post9.png',
                showtimes: ['Show 1: 9:00 AM', 'Show 2: 12:00 PM', 'Show 3: 3:00 PM'],
                city: 'Delhi'
            },
            
                {
                    name: 'The Matrix',
                    image: '/photos/post11.png',
                    showtimes: ['Show 1: 10:00 AM', 'Show 2: 1:00 PM', 'Show 3: 4:00 PM'],
                    city: 'Mumbai'
                },
                {
                    name: 'Jurassic World',
                    image: '/photos/post12.png',
                    showtimes: ['Show 1: 9:00 AM', 'Show 2: 12:00 PM', 'Show 3: 3:00 PM'],
                    city: 'Mumbai'
                },
                {
                    name: 'The Godfather',
                    image: '/photos/post13.png',
                    showtimes: ['Show 1: 11:00 AM', 'Show 2: 2:00 PM', 'Show 3: 5:00 PM'],
                    city: 'Mumbai'
                },
                
                {
                    name: 'Back to the Future',
                    image: '/photos/post15.png',
                    showtimes: ['Show 1: 9:00 AM', 'Show 2: 12:00 PM', 'Show 3: 3:00 PM'],
                    city: 'Pune'
                },
                {
                    name: 'The Shawshank Redemption',
                    image: '/photos/post16.png',
                    showtimes: ['Show 1: 11:00 AM', 'Show 2: 2:00 PM', 'Show 3: 5:00 PM'],
                    city: 'Pune'
                },
                {
                    name: 'The Lion King',
                    image: '/photos/post17.png',
                    showtimes: ['Show 1: 10:00 AM', 'Show 2: 1:00 PM', 'Show 3: 4:00 PM'],
                    city: 'Chandigarh'
                },
                
                {
                    name: 'Interstellar',
                    image: '/photos/post19.png',
                    showtimes: ['Show 1: 11:00 AM', 'Show 2: 2:00 PM', 'Show 3: 5:00 PM'],
                    city: 'Chandigarh'
                },
        ];
    
        $scope.filterMovies = function() {
            $scope.filteredMovies = $scope.movies.filter(function(movie) {
                return (movie.city === $scope.selectedCity || $scope.selectedCity === "") && movie.name.toLowerCase().includes($scope.searchQuery.toLowerCase());
            });
        };
    
        $scope.bookTickets = function (movie) {
            $scope.selectedMovie = movie;
            $scope.showTicketModal = true;
        };

        $scope.confirmBooking = function () {
            
            var bookingData = {
                numTickets: $scope.numTickets,
                movieName: $scope.selectedMovie.name,
                selectedCity: $scope.selectedCity 
            };

            $scope.confirmBooking = function () {

                var bookingData = {
                  numTickets: $scope.numTickets,
                  movieName: $scope.selectedMovie.name,
                  selectedCity: $scope.selectedCity
                };
                console.log(bookingData)
            
                $http.post('/confirm-booking', bookingData) // send to server
                  .then(function (response) {
                   
                    console.log('Booking confirmed:', response.data);
                   
                    $http.get('/download-pdf')
                      .then(function (pdfResponse) {
                        
                        console.log('PDF downloaded successfully');
                        
                        $window.open('/download-pdf', '_blank');
                      })
                      .catch(function (pdfError) {
                        
                        console.error('Error downloading PDF:', pdfError);
                      });
                  })
                  .catch(function (error) {
                    
                    console.error('Error confirming booking:', error);
                    
                    alert('An error occurred while confirming your booking. Please try again later.');
                  });
              };
                    };
        $scope.filterMovies();
    });
