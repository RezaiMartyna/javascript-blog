{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  }

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list', 
    articleAuthorSelector: '.post-author', 
    authorsListSelector: '.authors.list',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5, 
    cloudClassPrefix: "tag-size-"
  };

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');


    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };
  
    
    function generateTitleLinks(customSelector = ''){
  
    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    let html = '';
    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
      /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/

      titleList.insertAdjacentHTML('beforeend', linkHTML);

      /* insert link into html variable */
      html = html + linkHTML;

    }

    /*titleList.innerHTML = html;*/


    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function generateTags(){

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(opt.articleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
    
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML= html;
      console.log(html);
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
    
      /* remove class active */
      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let hrefTagLink of hrefTagLinks) {

      /* add class active */
      hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const TagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let TagLink of TagLinks){
      /* add tagClickHandler as event listener for that link */
      TagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
   addClickListenersToTags();

  function generateAuthors(){

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML= html;
      
    /* END LOOP: for every article: */
    }
  }
  
  generateAuthors();

  function AuthorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks) {
    
      /* remove class active */
      activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let hrefAuthorLink of hrefAuthorLinks) {

      /* add class active */
      hrefAuthorLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }
  
  function addClickListenersToAuthors(){
    /* find all links to tags */
    const AuthorLinks = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let AuthorLink of AuthorLinks){
      /* add tagClickHandler as event listener for that link */
      AuthorLink.addEventListener('click', AuthorClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();

  function calculateTagsParams(tags){
    const params = { min: 99999, max: 0 };
    
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
    
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
      
    }
    return params;
  }
  

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
    return opt.cloudClassPrefix + classNumber;
  }

  function generateTags(){
    
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};;
  
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(opt.articleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
        allTags[tag]++;
        }
  
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML= html;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
  
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }


  

  function generateAuthors(){
    /* [NEW] create a new variable allTags with an empty array */
    let allAuthors = {};
  
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
      
        /* generate HTML of the link */
        const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allAuthors[articleAuthor]) {
        /* [NEW] add tag to allTags object */
        allAuthors[articleAuthor] = 1;
        } else {
        allAuthors[articleAuthor]++;
        }

  
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML= html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');
  
    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {authors: []};
  
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let articleAuthor in allAuthors){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor],
    });
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }
  



}


