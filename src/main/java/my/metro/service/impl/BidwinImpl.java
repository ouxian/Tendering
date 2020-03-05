package my.metro.service.impl;

import my.metro.entities.Bidwin;
import my.metro.mapper.BidwinMapper;
import my.metro.service.BidwinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidwinImpl implements BidwinService {

    @Autowired
    BidwinMapper bidwinMapper;

    @Override
    public List<Bidwin> getAllByCompany(String WinbidCompany){
        if (WinbidCompany == null)
            return null;
        return bidwinMapper.getAllByCompany(WinbidCompany);
    }

    @Override
    public List<Bidwin> getAllByYear(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getAllByYear(bidwin);
    }

    @Override
    public List<Bidwin> getAllByCity(String city){
        if (city == null)
            return null;
        return bidwinMapper.getAllByCity(city);
    }

    @Override
    public List<Bidwin> getAllByYearAndCity(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getAllByYearAndCity(bidwin);
    }

    @Override
    public List<Bidwin> getAllByYearCityCompany(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getAllByYearCityCompany(bidwin);
    }

    @Override
    public List<Bidwin> getAllByYearAndCompany(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getAllByYearAndCompany(bidwin);
    }

    @Override
    public List<Bidwin> getAllByCityAndCompany(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getAllByCityAndCompany(bidwin);
    }

    @Override
    public List<Bidwin> getSumByCompanyYear(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getSumByCompanyYear(bidwin);
    }

    @Override
    public List <Bidwin> getSumByYearCity(Bidwin bidwin){
        if (bidwin == null)
            return null;
        return bidwinMapper.getSumByYearCity(bidwin);
    }


}
