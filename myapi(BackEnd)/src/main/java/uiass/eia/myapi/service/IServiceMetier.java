package uiass.eia.myapi.service;

import uiass.eia.myapi.model.*;

import java.util.List;

public interface IServiceMetier {
    void afficherDate();
    void deleteClient(long id);
    void deleteComment(long id);
    void deleteCommande(long id);
    void deleteDetailCommande(long id);
    void deleteCart(long idProduct,long idUser);
    void updateClient(Client client);

    void addClient(Client client);
    void addComment(Commentaire commentaire);
    void addCart(CartItem cartItem);
    void addCommande(Commande commande);
    void addDetailCommande(DetailCommande detailCommande);

    Client getByEmail(String email);

    Client getByEmailAndPassword(String email, String password);

    Client getById(long id);
    Commentaire commentById(long id);
    List<LolTuple<Long, Integer>> getAllCart(long id);
    List<CartItem> getAllCart2(long id);
    List<Commentaire> getAllComments();
    List<Commande> getAllCommande();
    List<Commande> getAllCommandeByClient(long id);
    List<DetailCommande> getAllDetailCommandeByCommande(long id);
    List<Commentaire> getAllCommentsByClientId(long id);
    List<Commentaire> getAllCommentsByClient(Client client);
    List<Commentaire> getAllCommentsByProductId(long id);
    void plus(long id, long id2);
    void minus(long id, long id2);
    void updateUser(long id, String name, String pronoun,  int age, String email, String password);

    void deleteAllCart(long idUser);

    void deleteClientByEmail(String email);
}
