package uiass.eia.myapi.dao;

import uiass.eia.myapi.model.CartItem;

import java.util.List;

public interface ICart {
    List<CartItem> getAllCart();
}
