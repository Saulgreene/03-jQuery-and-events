//  REVIEW: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide('fast');
      $('article[data-author="' + $(this).val() + '"]').fadeIn('slow')
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());
      $('article').hide('fast');
      $('article[data-category="' + $(this).val() + '"]').fadeIn('slow');
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  }
)};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).attr('data-content')).fadeIn()
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles').on('click', 'a.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
  /* TODO: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!

    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  */
};

articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
