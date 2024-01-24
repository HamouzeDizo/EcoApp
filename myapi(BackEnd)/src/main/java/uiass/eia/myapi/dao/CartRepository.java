package uiass.eia.myapi.dao;

import jakarta.persistence.Tuple;
import org.springframework.data.repository.CrudRepository;
import uiass.eia.myapi.model.CartItem;

import java.util.List;

public interface CartRepository extends CrudRepository<CartItem,Long> {
    List<CartItem> findAllByIdUser(long id);
    CartItem findByIdProductAndIdUser(long idProduct,long idUser);
    void deleteCartItemById(long id);
    CartItem findCartItemByIdProductAndIdUser(long idProduct,long idUser);
    @Override
    void deleteById(Long id);

}
