package uiass.eia.myapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uiass.eia.myapi.dao.*;
import uiass.eia.myapi.model.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ServiceMetierImp implements IServiceMetier{

    @Autowired
    ClientRepository clientRepository;
    @Autowired
    CommentaireRepository commentaireRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    CommandeRepository commandeRepository;
    @Autowired
    DetailCommandeRepository detailCommandeRepository;
    @Override
    public void afficherDate() {
        System.out.println(LocalDate.now());
    }

    @Override
    public void deleteClient(long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public void deleteComment(long id) {
        commentaireRepository.deleteById(id);
    }

    @Override
    public void deleteCommande(long id) {
        commandeRepository.deleteById(id);
        List<DetailCommande> list=this.detailCommandeRepository.findAllByIdCommande(id);
        for (DetailCommande detailCommande:list){
            this.deleteDetailCommande(detailCommande.getId());
        }
    }

    @Override
    public void deleteDetailCommande(long id) {
        detailCommandeRepository.deleteById(id);
    }

    @Override
    public void deleteCart(long idProduct,long idUser) {
        long id=cartRepository.findCartItemByIdProductAndIdUser(idProduct,idUser).getId();
        cartRepository.deleteById(id);
    }

    @Override
    public void updateClient(Client client) {
        clientRepository.save(client);
    }
    public List<Client> getAll(){
        return clientRepository.findAll();
    }


    @Override
    public Commentaire commentById(long id) {
        Optional<Commentaire> optionalCommentaire = commentaireRepository.findById(id);
        return optionalCommentaire.get();
    }

    @Override
    public List<LolTuple<Long, Integer>> getAllCart(long id) {
        List<CartItem> c=cartRepository.findAllByIdUser(id);
        List<LolTuple<Long,Integer>> tuples=new ArrayList<>();
        for (CartItem cartItem:c){
            tuples.add(new LolTuple<Long,Integer>(cartItem.getIdProduct(),cartItem.getQte()));
        }
        return tuples;
    }

    @Override
    public List<CartItem> getAllCart2(long id) {
        return this.cartRepository.findAllByIdUser(id);
    }


    public List<Commentaire> getAllComments(){
        return commentaireRepository.findAll();
    }

    @Override
    public List<Commande> getAllCommande() {
        return commandeRepository.findAll();
    }

    @Override
    public List<Commande> getAllCommandeByClient(long id) {
        return commandeRepository.findAllByIdClient(id);
    }

    @Override
    public List<DetailCommande> getAllDetailCommandeByCommande(long id) {
        return detailCommandeRepository.findAllByIdCommande(id);
    }

    @Override
    public List<Commentaire> getAllCommentsByClientId(long id) {
        return commentaireRepository.findAllByIdClient(id);
    }

    @Override
    public List<Commentaire> getAllCommentsByClient(Client client) {
        return this.getAllCommentsByClientId(client.getId());
    }

    @Override
    public List<Commentaire> getAllCommentsByProductId(long id) {
        return commentaireRepository.findAllByIdProduct(id);
    }

    @Override
    public void plus(long id, long id2) {
        CartItem cartItem = cartRepository.findByIdProductAndIdUser(id, id2);
        cartItem.setQte(cartItem.getQte() + 1);
        cartRepository.save(cartItem);
    }

    @Override
    public void minus(long id, long id2) {
        CartItem cartItem = cartRepository.findByIdProductAndIdUser(id, id2);
        cartItem.setQte(cartItem.getQte() - 1);
        cartRepository.save(cartItem);
    }

    @Override
    public void deleteAllCart(long idUser) {
        List<CartItem> list=cartRepository.findAllByIdUser(idUser);
        for (CartItem c:list){
            clientRepository.deleteById(c.getId());
        }
    }

    @Override
    public void deleteClientByEmail(String email) {
        long id =this.clientRepository.findClientByEmail(email).getId();
        this.clientRepository.deleteById(id);
    }


    public Client getByEmail(String email){
        return clientRepository.findClientByEmail(email);
    }
    public void addClient(Client client){
        clientRepository.save(client);
    }
    @Override
    public void addComment(Commentaire commentaire){
        System.out.println(commentaire);
        commentaireRepository.save(commentaire);
    }

    @Override
    public void addCart(CartItem cartItem) {
        cartRepository.save(cartItem);
    }

    @Override
    public void addCommande(Commande commande) {
        commandeRepository.save(commande);
    }

    @Override
    public void addDetailCommande(DetailCommande detailCommande) {
        detailCommandeRepository.save(detailCommande);
    }

    public Client getByEmailAndPassword(String email,String password){
        return clientRepository.findClientByEmailAndPassword(email,password);
    }

    @Override
    public Client getById(long id) {
        return clientRepository.findById(id);
    }

    @Override
    public void updateUser(long id, String name, String pronoun,  int age, String email, String password) {
        System.out.println("id is : "+id);
        Client client = clientRepository.findById(id);
        client.setNom(name);
        client.setPrenom(pronoun);
        client.setAge(age);
        client.setEmail(email);
        client.setPassword(password);
        clientRepository.save(client);
    }
}
