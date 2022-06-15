class CreateGallery {
    get createHeading(){
        return cy.get('h1.title-style')
    }
    get titleInput(){
        return cy.get('#title');
    }

    get descriptionInput(){
        return cy.get('#description');
    }

    get imageUrl(){
        return cy.get('.form-control').eq(2);
    }

    get upBtn(){
        return cy.get('button').eq(0);
    }

    get downBtn(){
        return cy.get('button').eq(1);
    }

    get addImageBtn(){
        return cy.get('button').eq(2);
    }

    get submitBtn(){
        return cy.get('.btn').eq(0);
    }

    get cancelBtn(){
        return cy.get('.btn').eq(1);
    }

    get newImgUrl(){
        return cy.get('.form-control').eq(3)
    }

    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }

    get email(){
        return cy.get('#email')
    }

    get password(){
        return cy.get('#password')
    }

    get submitButton(){
        return cy.get('.btn')
    }

    
    login(email, password){
        this.email.type(email)
        this.password.type(password)
        this.submitButton.click();
        
    }

    descriptionWith1000Char(titleInput, descriptionInput, imageUrl,){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    withoutTitle(descriptionInput,imageUrl,){
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    titleContainLess2character(titleInput,descriptionInput, imageUrl,){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    wrongUrlFormat(titleInput, descriptionInput, imageUrl,){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    allEmptyFields(){
        this.submitBtn.click();
    }

    oneImgWithoutDescription(titleInput, imageUrl,){
        this.titleInput.type(titleInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    oneImgWithDescription(titleInput, descriptionInput, imageUrl,){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.submitBtn.click();
    }

    twoImage(titleInput, descriptionInput, imageUrl, newImgUrl,){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.addImageBtn.click();
        this.newImgUrl.type(imageUrl);
        this.submitBtn.click();
    }

    getSecondImageOnFirstPlaceUsingArrow(titleInput, descriptionInput, imageUrl, newImgUrl, ){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageUrl.type(imageUrl);
        this.addImageBtn.click();
        this.newImgUrl.type(imageUrl);
        this.upBtn.click();
        this.submitBtn.click();
    }
}
export const create = new CreateGallery();