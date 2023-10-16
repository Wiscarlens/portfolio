# Personal Portfolio Website Front-End Tutorial
<div align="center">
    <img src="https://thenounproject.com/api/private/icons/2486059/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" width="200" alt="Hacker Picture">
</div>

> **Disclaimer:** This web application does not include real personal identifiable information

## Overview
<div>
    <p>Learn how to create your own personal portfolio with us.</p>
    <p>Your own portfolio website will allow you to showcase yourself to the world as a competent professional.</p>
    <p>I created this template based on a ficticious high school graduate who desired to get an scholarship for an undergraduate graphics design degree. The name of this fictious person is <b>Adriana Morales</b>.</p>
    <p>You can see how this template works and change it to adjust to your needs.</p>
    <p>The original Bootstrap template is here: <a href="https://bootstrapmade.com/demo/Personal/">Original Bootstrap Template Live Preview</a></p>
    <p>Let's get started friends</p>
    <p>&#128515</p>
</div>

## Skillset
<div>
    <p>We will cover the following points throughout this tutorial</p>
    <ul style="list-style-type: circle;">
        <li><h4>Editing Web Content</h4></li>
        <li><h4>Event Driven Programming</h4></li>
        <li><h4>DOM Manipulation</h4></li>
        <li><h4>AJAX HTTP Requests</h4></li>
        <li><h4>Form validation</h4></li>
    </ul>
</div>

## Front-End Stack
<div>
    <p>The following technologies will be covered in this tutorial:</p>
    <ul style="list-style-type: circle;">
        <li><h4>HTML</h4><img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" width="50"></li>
        <li><h4>CSS</h4><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-512.png" width="50"></li>
        <li><h4>JS</h4><img src="https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png" width="50"></li>
        <li><h4>Bootstrap</h4><img src="https://dh.library.virginia.edu/system/files/styles/large/private/bootstrap-stack.png?itok=b_S8F9nO" width="50"></li>
        <li><h4>jQuery</h4><img src="https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/JQuery_logo-512.png" width="50"></li>
    </ul>
<div>

## Editing Web Content

<div>
    <p>Since most of the design has already been implemented, the only thing left for us is to change the text and images of our website to fit our needs.</p>
</div>

<div>
    <h3>Relevant File Structure</h3>
    <p>The following is the way files are structured in this template</p>
    <pre>
    index.html (Main HTML File of the Web Site)
    assets/ (Static Files used in this website)
        css/ (Where CSS StyleSheets are located)
            jAlert.css (Dependency StyleSheet)
            style.css (Main StyleSheet of the Website)
        /img (Static Images shown in the website)
            portfolio/ (Images of Portfolio Projects)
            testimonials/ (Images of people who testify in our favor)
            bg.jpg (Background Image of Website)
            bg2.jpg (Image for HTML Templating)
            favicon.ico (Website Icon)
            me.jpg (Our own profile picture)
        /js (Static JS Files that add interactivity to our website)
            common.js (Contains constants that are key for the proper functioning of our website)
            index.js (Custom JS File that adds our own interactivity to the website)
            jAlert-functions.min.js (Dependency Script)
            jAlert.min.js (Dependency Script)
            main.js (Main JS File that came with the template)
    </pre>
</div>
<div>
    <h3><mark>ATTENTION HERE</mark> &#128064;</h3>
    <p>When we start out to develop the front-end from scratch. We are free to structure it any way we want.</p>
    <p>However, when we use a template build by other people we should abide by the structure they provided it</p>
    <p>If we make drastical changes such as changing the folder structure of changing file names we risk breaking out our front-end. &#128561;</p>
    <p>Hence, abide the following pieces of advice to edit the content of your portfolio.</p>
</div>

<div>
<h4>DO NOT DELETE/RENAME LIST</h4>
<p>You should neither delete nor rename the following elements so the app can work properly</p>

<ul>
    <li>index.html</li>
    <li>Anything inside the assets/vendor folder</li>
    <li>Anything inside the assets/css folder</li>
    <li>jAlert-functions.min.js, jAlert.min.js, and the main.js file found in assets/js</li>
    <li>Anything inside the assets/img folder</li>
</ul>
</div>

<div>
<h4>But how do I place my own images if I cannot rename them?</h4>

<p>The fact you cannot rename images does not mean you cannot change them. You just need to replace the old image by the new image.</p>

<p>Consider the following bulleted list to check the names relevant image files must have</p>
</div>

<div>
<h4>Relevant Image File Names in assets/img</h4>
<ul style="list-style-type: circle;">
    <li><b>me.jpg</b> This is the image file name for your profile picture</li>
    <li><b>bg.jpg</b> This is the name the background picture your website will have</li>
    <li><b>bg2.jpg</b> This is the name of a background picture of one of the email HTML templates</li>
    <li><b>portfolio-{number}.jpg</b>This is the format that your portfolio pictures should follow.</li>
    <li><b>testimonials-{number}.jpg</b>This is the format that your testimonial pictures should follow.</li>
</ul>

<p>Try changing the imges the template has for your own images, but remember to preserve the names.</p>
</div>

<div>
<h4>DO NOT MODIFY DEPENDENCY OR TEMPLATE FILES</h4>
<p><b>Dependency files</b> are files that belong to plugins/code from libraries we imported to make our website work better.</p>
<p><b>Template Files</b> are files that came with the Bootstrap Template</p>

<p>It is recommended that you <b>DO NOT MODIFY</b> these files because you could risk breaking the whole template.</p>
</div>

<div>
<h4>So what should I do if I want to change/add my own styles or scripts?</h4>
<p>In case you wish to do so please do the following</p>
<ul style="list-style-type: circle;">
    <li>Try adding, removing, or changing Bootstrap classes before modifying the stylesheets the website uses</li>
    <li>Add your own styles inside the <code>&lt;head&gt;</code> tag of your <b>index.html</b> by using the <code>&lt;style&gt;</code> tag</li>
    <li>Create your own JS Scripts inside <code>assets/js</code> and reference them at the bottom of your <b>index.html</b> page with the <code>&lt;script&gt;</code> tag</li>
</ul>
</div>

<div>
<h4>Changing Text Content In Our Website</h4>
<p>Fortunately changing text content in our website is way easier.</p>
<p>All we have to do is navigate our template in the browser, highlight the text we want to change and open up the inspector tool with <code>Ctrl + Shift + I</code>.</p>
<p>Alternatively, you could right-click the text you highlighted and click whatever option contains the word <b>Inspector</b> or <b>Inspect</b> in your browser</p>

<p>Then go to your <b>index.html</b> file and change the text you highlighted.</p>
<p>In case you want to add text just look at how the HTML around it is structured to write your own HTML.</p>

<p>Have fun modifying this template to create your own portfolio website.</p>

<p>&#128526;</p>
</div>

## Privacy Policy
<div>
    <p>No code in this web application was included that handles cookies or stores user data.</p>
</div>

## Copyright
<div>
    <blockquote>
        <a href="https://github.com/josewebdev2000">&copy; josewebdev2000</a> 2023<br>
        <a href="https://github.com/Wiscarlens">&copy; Wiscarlens</a> 2023
    </blockquote>
</div>