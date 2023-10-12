![Go Business logo](https://github.com/ireneuszcierpisz/go-business/blob/main/media/logo.png)


GoBusiness is an investment game based on the NPV economic measure (you can find more about it in the section Credit). Using GoBusiness you can check whether your investment will be profitable down the line. Note that this app is not an official tool for business, it is just a game.

![Picture of the site here](https://github.com/ireneuszcierpisz/go-business/blob/main/media/well-done2.png)

- Page is full responsive.
- Easy navigation. 
- Using Enter key in the field of numbers of periods launch a table of sales and costs.
- This section will allow the user to easily change previous amounts to calculate again.



## Features

#### The heading

- This section introduces the user to GoBusiness app.

![Picture of the heading here](https://github.com/ireneuszcierpisz/go-business/blob/main/media/heading.png)


#### Fields where an users can put in theirs assumptions about a bussiness: 


![Picture of the business assumptions here](https://github.com/ireneuszcierpisz/go-business/blob/main/media/first-step2.png)


#### Sales and costs are injected to the html with java script using DOM

- To launch this part of the code user has to use the Check button when inputs the number of years.
- A number of fields of sales and costs to fill in is equal to the number given by the user minus 1 as a year of investment is zero year.

![Picture of launched sales-costs here](https://github.com/ireneuszcierpisz/go-business/blob/main/media/JS-DOM.png)


#### Final message launched with java script using DOM elements

- This is a message included a value of the NPV.
- JS injects new elements to index.html using template literals

![Picture of gallery here](https://github.com/ireneuszcierpisz/go-business/blob/main/media/JSDOM-finalmessage.png)


## Accessibility

- There are used the aria-label and aria-labelledby atributes in the html code.


## Testing

- Making GoBusiness I have permanently conducting testing using Google Chrome Inspect feature, in particular the Console Toolbar, to test the functionality of the java script of the application.
- Tools for checking elements style were very helpful as well.
- Also I tested GoBusiness asking an accountant for the review.
- GoBusiness is responsive on different screen sizes and in different browsers as well.


### Validator Testing

#### Responsiveness

- Link https://ui.dev/amiresponsive?url=https://ireneuszcierpisz.github.io/go-business/


- Screenshot

   ![by amiresponsive](https://github.com/ireneuszcierpisz/go-business/blob/main/media/responsive1.png)


#### HTML

**No errors were returned when passing through the official W3C validator**

- Link

   [by W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fireneuszcierpisz.github.io%2Fgo-business%2F)


- Screenshot

  ![index.html](https://github.com/ireneuszcierpisz/go-business/blob/main/media/HTMLChecker.png)


#### CSS

**No errors were found when passing through the official W3C validator**

- Link

  [by Jigsaw W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fireneuszcierpisz.github.io%2Fgo-business%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en
)

- Screenshot

  ![index.html](https://github.com/ireneuszcierpisz/go-business/blob/main/media/W3CCSSvalidation.png)


#### Java Script

- To validate the code I have used https://jshint.com/


## Deployment

  - The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed
  - The live link can be found here - [GoBusiness](https://ireneuszcierpisz.github.io/go-business/)

## Credits

  - GoBusiness is made thanks Code Institute lectures in Full Stack Software Development (E-commerce Applications) course.
  - The concept of using NPV (Net Present Value) method as a business project appraisal method as well as formulas I took from the book FINANCE THEORY AND PRACTICE by ANN MARIE WARD. As it is said, the NPV method of project appraisal discounts the cash inflows and outflows of an investment to their present value. If the NPV is positive, then the project should be accepted else should be rejected. Working capital is both an investment and a source and use of finance.


### Content

- The icon in the header section and the copyright icon were taken from Font Awesome
- Font Flamenco for the logo and ADLaM Display were taken from Google Fonts
- Favicon I got thanks to [favicon.io](https://favicon.io/)
