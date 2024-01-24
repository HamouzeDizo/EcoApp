package uiass.eia.myapi.dao;

import org.springframework.data.repository.CrudRepository;
import uiass.eia.myapi.model.CartItem;
import uiass.eia.myapi.model.Commande;

import java.util.List;

public interface CommandeRepository extends CrudRepository<Commande,Long> {
    @Override
    void deleteById(Long id);
    List<Commande> findAllByIdClient(long idClient);
    List<Commande> findAll();
}
