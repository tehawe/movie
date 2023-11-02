function searcMovie() {
    let page = 1;
    $('#movie-list').html('');
    $.ajax({
        url: "https://www.omdbapi.com",
        method: "GET",
        dataType: "json",
        data: {
            'apikey': 'be68e844',
            's': $('#search-input').val(),
            'page': page

        },
        success: function (result) {
            if (result.Response == "True") {
                let movie = result.Search;
                $.each(movie, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col">
                            <div class="card h-100">
                                <img src="`+ checkImage(data.Poster) + `" class="card-img-top" alt="` + data.Title + `">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title + `</h5>
                                    <h6 class="">`+ data.Year + `</h6>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-primary movie-detail-button" data-bs-toggle="modal" data-bs-target="#movie-detail-info" data-id="`+ data.imdbID + `">Show Detail</button>
                                </div>
                            </div>
                        </div>
                    `);
                });



                // <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                // <li class="page-item"><a class="page-link" href="#">1</a></li>
                // <li class="page-item"><a class="page-link" href="#">2</a></li>
                // <li class="page-item"><a class="page-link" href="#">3</a></li>
                // <li class="page-item"><a class="page-link" href="#">Next</a></li>


                $('#search-input').val('');
            } else {
                $('#movie-list').html('<div class="p-3 mb-2 bg-warning text-dark text-center rounded">' + result.Error + '</div>')
            }
        }
    });
};

function checkImage(data) {
    if (data == "N/A") {
        return "/img/no-image.png";
    } else {
        return data;
    }
}

$('#search-button').on("click", function () {
    searcMovie();
});

$('#search-input').on("keyup", function (e) {
    if (e.keyCode === 13) {
        searcMovie();
    }
});

$('#movie-list').on('click', '.movie-detail-button', function () {
    $.ajax({
        url: "https://www.omdbapi.com",
        method: "GET",
        dataType: "json",
        data: {
            'apikey': 'be68e844',
            'plot': 'full',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ checkImage(movie.Poster) + `" class="img-fluid img-thumbnail" alt="` + movie.Title + `">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <h3>`+ movie.Title + `</h3>
                                    <h5>` + movie.Year + `</h5>
                                </li>
                                <li class="list-group-item">Released on `+ movie.Released + `</li>
                                <li class="list-group-item">`+ movie.Runtime + ` | ` + movie.Genre + `</li>
                                <li class="list-group-item">
                                    Director: `+ movie.Director + `<br />  
                                    Writer: `+ movie.Writer + `<br /> 
                                    Actors: `+ movie.Actors + `
                                </li>
                                <li class="list-group-item">`+ movie.Plot + `</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `);
            } else {
                $('.modal-body').html('<div class="p-3 mb-2 bg-warning text-dark text-center rounded">' + result.Error + '</div>')
            }
        }
    });
});