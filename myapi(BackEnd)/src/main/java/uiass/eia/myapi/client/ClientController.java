package uiass.eia.myapi.client;

import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import uiass.eia.myapi.dao.ClientDao;
import uiass.eia.myapi.model.*;
import uiass.eia.myapi.service.IServiceMetier;
import uiass.eia.myapi.service.ServiceMetierImp;

import javax.print.attribute.standard.Media;
import java.awt.*;
import java.util.List;

@Controller
@RestController
@EnableWebMvc
@RequestMapping(path = "/clients")
public class ClientController {

    @Autowired
    private ClientDao clientDao;
    @Autowired
    private IServiceMetier service;
    @CrossOrigin("*")
    @GetMapping(path = "/")
    public List<Client> getClients(){
        return clientDao.getAllClients();
    }

    @RequestMapping( path = "/delete/{id}",method = RequestMethod.DELETE)
    public String deleteClient(@PathVariable(value = "id") long id){
        this.service.deleteClient(id);
        return "remove client";
    }
    @RequestMapping( path = "/deleteByEmail/{email}",method = RequestMethod.DELETE)
    public String deleteClientByEmail(@PathVariable(value = "email") String email){
        System.out.println("hey");
        this.service.deleteClientByEmail(email);
        return "remove client";
    }

    @GetMapping( path = "/{id}")
    public Client getById(@PathVariable long id){
        System.out.println("here baby");
        return this.service.getById(id);
    }

    @GetMapping(path = "/email")
    public Client getByEmail(@RequestParam String email){
        return this.service.getByEmail(email);
    }

    @PutMapping(path="/update",consumes =  MediaType.APPLICATION_JSON_VALUE)
    public void updateClient(@RequestBody Client client){
        this.service.updateClient(client);
    }

    @PostMapping(path = "/" ,consumes =  MediaType.APPLICATION_JSON_VALUE)
    public void addClient(@RequestBody Client client ){
        this.service.addClient(client);
    }

    @GetMapping(path = "/login")
    public Client getByEmailAndPassword(@RequestParam String email,@RequestParam String password){
        System.out.println(this.service.getByEmailAndPassword(email,password));
        return this.service.getByEmailAndPassword(email,password);
    }

    @GetMapping(path = "/comments")
    public List<Commentaire> getComments(){
        return this.service.getAllComments();
    }

    @GetMapping( path = "/comments/{id}")
    public Commentaire getOneCommentById(@PathVariable long id){
        return this.service.commentById(id);
    }

    @GetMapping( path = "/comments/By/{id}")
    public List<Commentaire> getCommentsById(@PathVariable long id){
        return this.service.getAllCommentsByClientId(id);
    }

    @GetMapping( path = "/comments/ByProduct/{id}")
    public List<Commentaire> getCommentsByProductId(@PathVariable long id){
        return this.service.getAllCommentsByProductId(id);
    }

    @GetMapping( path = "/comments/By/client", consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Commentaire> getCommentsByClient(@RequestBody Client client){
        return this.service.getAllCommentsByClient(client);
    }

    @PostMapping(path = "/comments/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addComment(@RequestBody Commentaire commentaire) {
        this.service.addComment(commentaire);
    }

    @GetMapping(path = "/orders/user/{idClient}")
    public List<Commande> getAllCommande(@PathVariable long idClient){
        return this.service.getAllCommandeByClient(idClient);
    }

    @PostMapping(path = "/orders/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addCommande(@RequestBody Commande commande) {
        this.service.addCommande(commande);
    }

    @RequestMapping(path = "/orders/delete/{idCommande}",method = RequestMethod.DELETE)
    public void deleteCommande(@PathVariable long idCommande){
        this.service.deleteCommande(idCommande);
    }

    @GetMapping(path = "/orderDetail/user/{idCommande}")
    public List<DetailCommande> getAllDetailCommande(@PathVariable long idCommande){
        return this.service.getAllDetailCommandeByCommande(idCommande);
    }

    @PostMapping(path = "/orderDetail/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addDetailCommande(@RequestBody DetailCommande detailCommande) {
        this.service.addDetailCommande(detailCommande);
    }

    @GetMapping( path = "/carts/ByUser/{id}")
    public List<LolTuple<Long,Integer>> getCartByIdUser(@PathVariable long id){
        return this.service.getAllCart(id);
    }
    @GetMapping( path = "/carts/ByUser/test/{id}")
    public List<CartItem> test(@PathVariable long id){
        return this.service.getAllCart2(id);
    }

    @PostMapping(path = "/carts/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addCart(@RequestBody CartItem cart){
        this.service.addCart(cart);
    }

    @RequestMapping(path = "/cart/delete/{idProduct}/{idUser}",method = RequestMethod.DELETE)
    public void deleteCart(@PathVariable long idProduct,@PathVariable long idUser){
        this.service.deleteCart(idProduct,idUser);
    }

    @RequestMapping(path = "/cart/delete/{idUser}",method = RequestMethod.DELETE)
    public void emptyCart(@PathVariable long idUser){
        this.service.deleteAllCart(idUser);
    }

    @PutMapping(path="/cart/increase/{idProduct}/{idUser}")
    public void increaseCart(@PathVariable long idProduct,@PathVariable int idUser){
        this.service.plus(idProduct,idUser);
    }
    @PutMapping(path="/cart/decrease/{idProduct}/{idUser}")
    public void decreaseCart(@PathVariable long idProduct,@PathVariable int idUser){
        this.service.minus(idProduct,idUser);
    }


}
