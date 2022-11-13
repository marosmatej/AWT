export default class OpinionsHandler
{
    constructor(opinionsFormElementId, opinionsListElementId)
    {
        this.opinions = [];
        this.opinionsElement = document.getElementById(opinionsListElementId);
        this.opinionsFormElement = document.getElementById(opinionsFormElementId);
    }

    init()
    {
        if(localStorage.myTreesComments)
        {
          opinions=JSON.parse(localStorage.myTreesComments);
        }
        this.opinionsElement.innerHTML = this.opinionArrayHTML(this.opinions);
        this.opinionsFormElement.addEventListener("submit", event => this.processOpinionFormData(event));
    }

    processOpinionFormData(event)
    {
        event.preventDefault();

        const _name = document.getElementById("name").value.trim();
        const _email = document.getElementById("email").value.trim();
        const _comment = document.getElementById("comment").value.trim();
        const temp_carLover = document.getElementById("carLover");
        var _carLover = "Áno";
        temp_carLover.checked ? _carLover = "Áno" : _carLover = "Nie";

        const newOpinion = 
        {
          name: _name,
          email: _email,
          comment: _comment,
          carLover: _carLover,
          created: new Date()
        };

      console.log("New opinion:\n "+JSON.stringify(newOpinion));

      this.opinions.push(newOpinion);

      localStorage.myTreesComments = JSON.stringify(opinions);


      this.opinionsElement.innerHTML+=this.opinionHTML(newOpinion);


      this.opinionsFormElement.reset()
    }

    opinionHTML(opinion)
    {
        const opinionTemplate=
        `
            <section>
               <h3>${opinion.name} <i>(${(new Date(opinion.created)).toDateString()})</i></h3>

               <p>${opinion.comment}</p>
               <p>${opinion.carLover}</p>
            </section>`;

        return opinionTemplate;
    }

    opinionArrayHTML(sourceData)
    {
        return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ this.opinionHTML(opn),"");
    }
}