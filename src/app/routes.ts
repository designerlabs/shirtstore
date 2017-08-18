import { Component, Inject } from '@angular/core'
import { Routes } from '@angular/router'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { Error404Component } from './error/error404/error404.component'


export const appRoutes:Routes = [
    {path: '404', component: Error404Component },
    {path: 'shop', component: HomeComponent},
    {path: '', redirectTo: 'shop', pathMatch: 'full'}
]