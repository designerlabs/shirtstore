import { Component, Inject } from '@angular/core'
import { Routes } from '@angular/router'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { HomeComponent } from './home/home.component'

export const appRoutes:Routes = [
    {path: 'shop', component: HomeComponent},
    {path: '', redirectTo: 'shop', pathMatch: 'full'}
]