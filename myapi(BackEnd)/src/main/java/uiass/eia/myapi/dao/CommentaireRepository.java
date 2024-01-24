package uiass.eia.myapi.dao;

import org.springframework.data.repository.CrudRepository;
import uiass.eia.myapi.model.Client;
import uiass.eia.myapi.model.Commentaire;

import java.net.ConnectException;
import java.util.List;

public interface CommentaireRepository extends CrudRepository<Commentaire,Long> {
    List<Commentaire> findAll();
    List<Commentaire> findAllByIdClient(long id);
    List<Commentaire> findAllByIdProduct(long id);
    @Override
    void deleteById(Long id);
}
